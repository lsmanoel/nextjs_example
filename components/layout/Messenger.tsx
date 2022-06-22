import React, { ReactElement, useState } from "react";
import styles from "styles/components/Messenger.module.scss";
import { useRouter } from "next/router";

interface Props {
  hidden: boolean;
  onSubmit: () => void;
}

export default function Messenger({ hidden, onSubmit }: Props): ReactElement {
  const [emailCC, setEmailCC] = useState<string>("");
  const [messenge, setMessenge] = useState<string>("");

  const preventDefaultOnSubmit: React.FormEventHandler = async function (e) {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      className={`${styles.Messenger} ${hidden ? styles.hidden : ""}`}
      onSubmit={preventDefaultOnSubmit}
    >
      <label>Como cópia para:</label>
      <input
        type={"email"}
        placeholder={"Ensira o email..."}
        name={"EmailCC"}
        value={emailCC}
        onInput={(e) => {
          setEmailCC((e.target as HTMLInputElement).value);
        }}
        autoComplete="off"
        required
      />
      <label>Mensagem:</label>
      <textarea
        placeholder={"Ensira sua mensagem..."}
        name={"Messenge"}
        value={messenge}
        rows={40}
        onInput={(e) => {
          setMessenge((e.target as HTMLInputElement).value);
        }}
        required
      />
      <div className={styles.buttons}>
        <input type={"submit"} value={"Enviar"} />
        <input
          type={"reset"}
          placeholder={"Ensira o email..."}
          name={"EmailCC"}
          value={"Cancelar"}
          onInput={(e) => {
            setEmailCC((e.target as HTMLInputElement).value);
          }}
          required
        />
      </div>
    </form>
  );
}
