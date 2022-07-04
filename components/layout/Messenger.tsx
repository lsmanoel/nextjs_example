import React, { ReactElement, useEffect, useRef, useState } from "react";
import { statusColor } from "lib/statusColor";
import { Props as SendEmailProps } from "lib/emailjs/sendEmail";
import styles from "styles/components/Messenger.module.scss";
import { useSession } from "next-auth/react";

export interface Props {
  hidden: boolean;
  onSubmit?: (status: statusColor) => void;
  onClear?: () => void;
  sendEmail: (props: SendEmailProps) => void;
}

export default function Messenger({
  hidden,
  onSubmit,
  onClear,
  sendEmail,
}: Props): ReactElement {
  const { data: session } = useSession();
  const form = useRef<HTMLFormElement>(null);
  const lastHiddenStatus = useRef<boolean>(hidden);
  const [status, setStatus] = useState<statusColor>();
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const clearForm = () => {
    setMessage("");
    onClear && onClear();
  };

  const submit: React.FormEventHandler = async function (e) {
    e.preventDefault();
    sendEmail({ form, setStatus, onSubmit });
  };

  useEffect(() => {
    if (lastHiddenStatus.current === true && hidden === false) {
      setStatus(undefined);
      onSubmit && onSubmit(undefined);
    }
    lastHiddenStatus.current = hidden;
  }, [hidden, onSubmit]);

  useEffect(() => {
    session?.user?.email && setEmail(session.user.email);
  }, [session]);

  return (
    <form
      ref={form}
      role="form"
      className={`
      ${styles.Messenger}
      ${hidden ? styles.hidden : ""}
      ${status === "success" ? styles.success : ""}
      ${status === "warn" ? styles.warn : ""}
      ${status === "error" ? styles.error : ""}
      `}
      onSubmit={submit}
    >
      <label htmlFor="email">Seu email:</label>
      <input
        type={"email"}
        placeholder={"Ensira o seu email..."}
        id={"email"}
        value={email}
        onInput={(e) => {
          setEmail((e.target as HTMLInputElement).value);
        }}
        autoComplete="off"
        required
      />
      <label htmlFor="email">Mensagem:</label>
      <textarea
        placeholder={"Ensira sua mensagem..."}
        id={"message"}
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
