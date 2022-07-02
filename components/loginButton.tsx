import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signIn, signOut } from "next-auth/react";

import styles from "styles/components/LoginButton.module.scss";

interface Props {
  icon: IconDefinition;
  providerName: string;
}

export default function LoginButton({ icon, providerName }: Props) {
  const { data: session } = useSession();
  const logged = session?.provider === providerName;
  return (
    <div className={styles.LoginButton}>
      <button
        className={`${logged ? styles.buttonEnable : ""}`}
        onClick={() => (logged ? signOut() : signIn(providerName))}
      >
        {logged ? <span>Logado com</span> : <span>Logar com</span>}
        {icon && <FontAwesomeIcon icon={icon} />}
        {logged && <span>(Aperte para efetuar o logout)</span>}
      </button>
    </div>
  );
}
