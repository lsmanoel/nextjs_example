import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signIn, signOut } from "next-auth/react";

import styles from "styles/components/LoginButton.module.scss";

interface Props {
  icon: IconDefinition;
}

export default function LoginButton({ icon }: Props) {
  const { data: session } = useSession();
  return (
    <div className={styles.LoginButton}>
      <button
        className={`${session ? styles.buttonEnable : ""}`}
        onClick={() => (session ? signOut() : signIn())}
      >
        {session ? <span>Logado com</span> : <span>Logar com</span>}
        {icon && <FontAwesomeIcon icon={icon}></FontAwesomeIcon>}
      </button>
    </div>
  );
}
