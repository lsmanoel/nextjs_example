import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { statusColor } from "lib/statusColor";
import styles from "styles/components/chat/ChatBox.module.scss";
import { getSession, useSession } from "next-auth/react";
import MessageBox from "./MessageBox";
import { Message } from "lib/chat";
import {
  postChatMessageResultMsg,
  deleteChatMessageResultMsg,
  updateChatMessageResultMsg,
} from "lib/requests-results";
import { db } from "lib/firebase";
import {
  collection,
  getDoc,
  query,
  where,
  onSnapshot,
  getDocs,
  orderBy,
} from "firebase/firestore";
import UserBox from "./UserBox";
import { User } from "lib/user";
import { RootState } from "redux/chat/store";
import { useAppSelector } from "redux/hooks";

export default function ChatBox(): ReactElement {
  const router = useRouter();
  const session = useSession();
  const notifications = useAppSelector(
    (state: RootState) => state.notifications
  );

  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<statusColor>();
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [messageToUpdate, setMessageToUpdate] = useState<Message | null>(null);
  const [usersIsReady, setUsersIsReady] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [scrollToBottonEnable, setScrollToBottonEnable] =
    useState<boolean>(true);
  const [isAdm, setIsAdm] = useState(true);

  const messagesObjDiv = document.getElementById("messages") as HTMLDivElement;

  const clearForm = () => {
    setText("");
  };

  const submit: React.FormEventHandler = async function (event) {
    event.preventDefault();
    if (messageToUpdate) {
      updateMessage(text, messageToUpdate);
      setUpdateMessage(messageToUpdate);
    } else postMessage(text);
  };

  const setUpdateMessage = (message: Message) => {
    if (message.id === messageToUpdate?.id) {
      setMessageToUpdate(null);
      setStatus("selected");
    } else {
      setMessageToUpdate(message);
      setText(message.text);
      setStatus("warn");
    }
  };

  const postMessage = async (text: string): Promise<string> => {
    if (!session.data?.user?.email)
      return postChatMessageResultMsg.BAD_CREDENTIALS;
    else if (text === "") return;
    else {
      const route = userId ? `/api/chat/post/${userId}` : `/api/chat/post/self`;
      const response = await fetch(route, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
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
        return postChatMessageResultMsg.SUCCESS;
      } else {
        return postChatMessageResultMsg.BAD_RESPONSE;
      }
    }
  };

  const updateMessage = async (
    text: string,
    message: Message
  ): Promise<string> => {
    if (!session.data?.user?.email)
      return updateChatMessageResultMsg.BAD_CREDENTIALS;
    else {
      const route = userId
        ? `/api/chat/update/${userId}/${message.id}`
        : `/api/chat/update/${message.id}`;
      const response = await fetch(route, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
        method: "PUT",
      }).catch(() => null);

      if (!response) {
        return updateChatMessageResultMsg.FETCH_ERROR;
      } else if (response.status === 401) {
        return updateChatMessageResultMsg.BAD_CREDENTIALS;
      } else if (response.status === 400) {
        return updateChatMessageResultMsg.BAD_REQUEST;
      } else if (response.status !== 200) {
        return updateChatMessageResultMsg.UNKNOW_ERROR;
      }

      const updatedText: string = await response.json().catch(() => null);
      if (updatedText == text) {
        return updateChatMessageResultMsg.SUCCESS;
      } else {
        return updateChatMessageResultMsg.BAD_RESPONSE;
      }
    }
  };

  const deleteMessage = async (message: Message): Promise<string> => {
    if (!session.data?.user?.email)
      return deleteChatMessageResultMsg.BAD_CREDENTIALS;
    else {
      const route = userId
        ? `/api/chat/delete/${userId}/${message.id}`
        : `/api/chat/delete/${message.id}`;
      const response = await fetch(route, {
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
  };

  const clearNotifications = async (): Promise<string> => {
    if (!session.data?.user?.email)
      return deleteChatMessageResultMsg.BAD_CREDENTIALS;
    else {
      const route = userId
        ? `/api/chat/clear-notifications/${userId}`
        : `/api/chat/clear-notifications/self`;
      const response = await fetch(route, {
        method: "PUT",
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
  };
  useEffect(() => {
    clearNotifications();
  }, [notifications, userId, messages]);

  async function messagesSnapshot() {
    if (session.data?.chatId) {
      clearNotifications();
      const q = query(
        collection(db, "chat", userId || session.data.chatId, "messages"),
        orderBy("created", "asc"),
        where("deleted", "==", false)
      );
      onSnapshot(q, (querySnapshot) => {
        const messages: Message[] = [];
        querySnapshot.forEach((doc) => {
          const message: Message = {
            id: doc.id,
            created: doc.data().created,
            name: doc.data().name,
            email: doc.data().email,
            text: doc.data().text,
            deleted: doc.data().deleted,
          };
          messages.push(message);
        });
        setMessages(messages);
      });
    }
  }
  useEffect(() => {
    db && messagesSnapshot();
  }, [db, userId]);

  async function usersSnapshot() {
    const q = query(collection(db, "users"), orderBy("lastPost", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const users: User[] = [];
      querySnapshot.forEach((doc) => {
        const user: User = {
          id: doc.id,
          created: doc.data().created,
          name: doc.data().name,
          email: doc.data().email,
          image: doc.data().image,
          notifications: doc.data().sentNotifications,
        };
        users.push(user);
      });
      setUsers(users);
      !usersIsReady && setUsersIsReady(true);
    });
  }
  useEffect(() => {
    isAdm && db && usersSnapshot();
  }, [db, isAdm]);

  const scrollMessagesToBottom = (enable: boolean) => {
    if (enable && messagesObjDiv) {
      messagesObjDiv.scrollIntoView(true);
      messagesObjDiv.scrollTop = messagesObjDiv.scrollHeight;
    }
    return;
  };
  useEffect(() => {
    scrollMessagesToBottom(scrollToBottonEnable);
  }, [messages]);

  const handleMessagesScroll = () => {
    setScrollToBottonEnable(
      messagesObjDiv?.scrollTop &&
        messagesObjDiv.scrollHeight - messagesObjDiv.scrollTop ===
          messagesObjDiv.clientHeight
    );
  };

  useEffect(() => {
    if (session.data?.user?.email)
      if (session.data.user.email === process.env.EMAIL_ADM) {
        if (users[0]) setUserId(users[0].id);
        setIsAdm(true);
      } else {
        setIsAdm(false);
      }
  }, [session, usersIsReady]);

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
      <div id="displayPanel">
        <div id="messages" onScroll={() => handleMessagesScroll()}>
          {messages.map((message: Message, index) => (
            <MessageBox
              key={index}
              message={message}
              response={message.email !== session.data?.user.email}
              onUpdate={() => setUpdateMessage(message)}
              onDelete={() => deleteMessage(message)}
              color={messageToUpdate?.id == message.id && "warn"}
            />
          ))}
        </div>

        {isAdm && (
          <div id="users">
            {users.map((user: User, index) => (
              <UserBox
                key={index}
                user={user}
                onClick={() => setUserId(user.id)}
                color={userId == user.id && "success"}
                selected={userId == user.id}
              />
            ))}
          </div>
        )}
      </div>
      <div id="inputPanel">
        <textarea
          placeholder={"Ensira sua mensagem..."}
          name={"message"}
          id="taYourText"
          value={text}
          rows={40}
          cols={40}
          onInput={(e) => {
            setText((e.target as HTMLInputElement).value);
          }}
          required
        />
        <div className={styles.buttons}>
          <input type={"submit"} value={"Enviar"} />
          <input type={"button"} value={"Limpar"} onClick={() => clearForm()} />
          {messageToUpdate && (
            <input
              type={"button"}
              value={"Cancelar"}
              onClick={() => setUpdateMessage(messageToUpdate)}
            />
          )}
        </div>
      </div>
    </form>
  );
}
