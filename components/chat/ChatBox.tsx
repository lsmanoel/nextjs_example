import React, { ReactElement, useEffect, useRef, useState } from "react";
import { statusColor } from "lib/statusColor";
import styles from "styles/components/chat/ChatBox.module.scss";
import { useSession } from "next-auth/react";
import MessageBox from "./MessageBox";
import { Message } from "lib/chat";
import {
  postChatMessageResultMsg,
  deleteChatMessageResultMsg,
} from "lib/requests-results";
import { db } from "lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

export default function ChatBox(): ReactElement {
  const session = useSession();
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<statusColor>();
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [firebaseIsReady, setFirebaseIsReady] = useState(false);

  const clearForm = () => {
    setText("");
  };

  const submit: React.FormEventHandler = async function (event) {
    event.preventDefault();
    postMessage(text);
  };

  const postMessage = async (text: string): Promise<string> => {
    if (!session) return postChatMessageResultMsg.BAD_CREDENTIALS;
    else if (text === "") return;
    else {
      const readRoute = "/api/chat/post/message";
      const response = await fetch(readRoute, {
        body: JSON.stringify({
          text,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).catch(() => null);

      if (!response) {
        return postChatMessageResultMsg.FETCH_ERROR;
      } else if (response.status === 401) {
        return postChatMessageResultMsg.BAD_CREDENTIALS;
      } else if (response.status === 400) {
        return postChatMessageResultMsg.BAD_REQUEST;
      } else if (response.status !== 200) {
        return postChatMessageResultMsg.UNKNOW_ERROR;
      }

      const sevedMessage: Message = await response.json().catch(() => null);
      if (sevedMessage.text == text) {
        setMessages([...messages, sevedMessage]);
        return postChatMessageResultMsg.SUCCESS;
      } else {
        return postChatMessageResultMsg.BAD_RESPONSE;
      }
    }
  };

  async function updateMessage(message: Message) {}

  async function deleteMessage(message: Message) {
    if (!session) return deleteChatMessageResultMsg.BAD_CREDENTIALS;
    else {
      const readRoute = `/api/chat/delete/${message.id}`;
      const response = await fetch(readRoute, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }).catch(() => null);

      if (!response) {
        return deleteChatMessageResultMsg.FETCH_ERROR;
      } else if (response.status === 401) {
        return deleteChatMessageResultMsg.BAD_CREDENTIALS;
      } else if (response.status === 400) {
        return deleteChatMessageResultMsg.BAD_REQUEST;
      } else if (response.status !== 200) {
        return deleteChatMessageResultMsg.UNKNOW_ERROR;
      }

      const deleted: boolean = await response.json().catch(() => null);
      if (deleted) {
        return deleteChatMessageResultMsg.SUCCESS;
      } else {
        return deleteChatMessageResultMsg.BAD_RESPONSE;
      }
    }
  }

  async function firebaseSnapshot() {
    const q = query(
      collection(db, session.data.user.email),
      where("deleted", "==", false)
    );
    onSnapshot(q, (querySnapshot) => {
      const messages: Message[] = [];
      querySnapshot.forEach((doc) => {
        const message: Message = {
          id: doc.id,
          created: doc.data().created,
          name: doc.data().name,
          text: doc.data().text,
          deleted: doc.data().deleted,
        };
        messages.push(message);
      });
      setMessages(messages);
    });
  }
  useEffect(() => {
    db && firebaseIsReady && session.data?.user.email && firebaseSnapshot();
  }, [db, session, firebaseIsReady]);

  async function firebaseSignIn() {
    const auth = getAuth();
    await signInAnonymously(auth)
      .then(() => {
        setFirebaseIsReady(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
        // ...
      });
  }
  useEffect(() => {
    firebaseSignIn();
  }, []);

  return (
    <form
      ref={form}
      role="form"
      className={`
      ${styles.ChatBox}
      ${status === "success" ? styles.success : ""}
      ${status === "warn" ? styles.warn : ""}
      ${status === "error" ? styles.error : ""}
      `}
      onSubmit={submit}
    >
      <div id="messages">
        {messages.map((message: Message, index) => (
          <MessageBox
            key={index}
            message={message}
            onUpdate={() => updateMessage(message)}
            onDelete={() => deleteMessage(message)}
          />
        ))}
      </div>
      <textarea
        placeholder={"Ensira sua mensagem..."}
        name={"message"}
        value={text}
        rows={40}
        onInput={(e) => {
          setText((e.target as HTMLInputElement).value);
        }}
        required
      />
      <div className={styles.buttons}>
        <input type={"submit"} value={"Enviar"} />
        <input type={"button"} value={"Limpar"} onClick={() => clearForm()} />
      </div>
    </form>
  );
}
