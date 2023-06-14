import React, { ReactElement, useEffect, useRef, useState } from "react";
import { statusColor } from "lib/statusColor";
import styles from "styles/components/chat/ChatBox.module.scss";
import { useSession } from "next-auth/react";
import Message from "./Message";

export default function ChatBox(): ReactElement {
  const { data: session } = useSession();
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<statusColor>();
  const [message, setMessage] = useState<string>("");

  const clearForm = () => {
    setMessage("");
  };

  const submit: React.FormEventHandler = async function (e) {
    e.preventDefault();
  };

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
        <Message
          name="Lucas"
          date="24/10/1991 - 11:50"
          message="hello word"
          onUpdate={() => {}}
          onDelete={() => {}}
        />
        <Message
          name="Lucas"
          date="24/10/1991 - 11:50"
          message="hello word"
          response={true}
          color="error"
          onUpdate={() => {}}
          onDelete={() => {}}
        />
        <Message
          name="Lucas"
          date="24/10/1991 - 11:50"
          message="hello word"
          onUpdate={() => {}}
          onDelete={() => {}}
        />
        <Message
          name="Lucas"
          date="24/10/1991 - 11:50"
          message="hello word"
          onUpdate={() => {}}
          onDelete={() => {}}
        />
      </div>
      <textarea
        placeholder={"Ensira sua mensagem..."}
        name={"message"}
        value={message}
        rows={40}
        onInput={(e) => {
          setMessage((e.target as HTMLInputElement).value);
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
