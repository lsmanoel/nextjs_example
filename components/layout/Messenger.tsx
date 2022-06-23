import React, { ReactElement, useEffect, useRef, useState } from "react";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { statusColor } from "lib/statusColor";

import styles from "styles/components/Messenger.module.scss";

interface Props {
  hidden: boolean;
  onSubmit?: (status: statusColor) => void;
  onClear?: () => void;
}

export default function Messenger({
  hidden,
  onSubmit,
  onClear,
}: Props): ReactElement {
  const form = useRef<HTMLFormElement>(null);
  const lastHiddenStatus = useRef<boolean>(hidden);
  const [status, setStatus] = useState<statusColor>();
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const sendEmail = () => {
    console.log(process.env.SERVICE_ID);
    console.log(process.env.TEMPLATE_ID);
    console.log(process.env.PUBLIC_KEY);
    emailjs
      .sendForm(
        process.env.SERVICE_ID || "",
        process.env.TEMPLATE_ID || "",
        form.current || "",
        process.env.PUBLIC_KEY || ""
      )
      .then(
        (_) => {
          setStatus("success");
          onSubmit && onSubmit("success");
        },
        (error) => {
          console.log(error.text);
          setStatus("error");
          onSubmit && onSubmit("error");
        }
      );
  };

  const clearForm = () => {
    setEmail("");
    setMessage("");
    onClear && onClear();
  };

  const submit: React.FormEventHandler = async function (e) {
    e.preventDefault();
    sendEmail();
  };

  useEffect(() => {
    if (lastHiddenStatus.current === true && hidden === false) {
      setStatus(undefined);
      onSubmit && onSubmit(undefined);
    }
    lastHiddenStatus.current = hidden;
  }, [hidden, onSubmit]);

  return (
    <form
      ref={form}
      className={`
      ${styles.Messenger}
      ${hidden ? styles.hidden : ""}
      ${status === "success" ? styles.success : ""}
      ${status === "warn" ? styles.warn : ""}
      ${status === "error" ? styles.error : ""}
      `}
      onSubmit={submit}
    >
      <label>Seu email:</label>
      <input
        type={"email"}
        placeholder={"Ensira o seu email..."}
        name={"email"}
        value={email}
        onInput={(e) => {
          setEmail((e.target as HTMLInputElement).value);
        }}
        autoComplete="off"
        required
      />
      <label>Mensagem:</label>
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
