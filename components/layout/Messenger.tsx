import { ReactElement, useState } from "react";
import styles from "styles/components/Messenger.module.scss";
import { useRouter } from "next/router";

interface Props {
  hidden: boolean;
}

export default function Messenger({ hidden }: Props): ReactElement {
  const router = useRouter();
  const [emailCC, setEmailCC] = useState<string>("");
  const [messenge, setMessenge] = useState<string>("");

  return (
    <form className={`${styles.Messenger} ${hidden ? styles.hidden : ""}`}>
      <label>Como cópia para:</label>
      <input
        type={"text"}
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
          value={"Cancel"}
          onInput={(e) => {
            setEmailCC((e.target as HTMLInputElement).value);
          }}
          required
        />
      </div>
    </form>
  );
}
