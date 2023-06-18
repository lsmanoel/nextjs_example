import React, { ReactElement, useEffect, useRef, useState } from "react";
import { statusColor } from "lib/statusColor";
import styles from "styles/components/chat/ChatBox.module.scss";
import { useSession } from "next-auth/react";
import MessageBox from "./MessageBox";
import { getToken } from "next-auth/jwt";
import { Message } from "lib/chat";

export default function ChatBox(): ReactElement {
  const session = useSession();
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<statusColor>();
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const clearForm = () => {
    setText("");
  };

  const submit: React.FormEventHandler = async function (event) {
    event.preventDefault();
    postMessage(text);
  };

  const getMessages = async () => {
    const readRoute = "/api/chat/get/messages";
    const response = await fetch(readRoute, {
      method: "GET",
    }).catch(() => null);
    const messages = await response.json().catch(() => null);
    setMessages(messages);
  };

  const postMessage = async (text: string) => {
    if (text === "") return;
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
      const sevedMessage: Message = await response.json().catch(() => null);
      if (sevedMessage.text == text) {
        setMessages([...messages, sevedMessage]);
      }
    }
  };

  useEffect(() => {
    getMessages();
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
        {messages.map((message, index) => (
          <MessageBox
            key={index}
            name={message.name}
            date={message.created}
            message={message.text}
            onUpdate={() => {}}
            onDelete={() => {}}
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
