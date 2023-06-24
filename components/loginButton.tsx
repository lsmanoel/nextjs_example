import { useState, useEffect } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signIn, signOut, SignInResponse } from "next-auth/react";

import styles from "styles/components/LoginButton.module.scss";

interface Props {
  icon: IconDefinition;
  providerName: string;
}

export default function LoginButton({ icon, providerName }: Props) {
  const { data: session } = useSession();
  const logged = session?.provider === providerName;

  const innerWidthThreshold = 1000;
  const [innerWidth, getInnerWidth] = useState(innerWidthThreshold + 1);
  const setInnerWidth = () => {
    getInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    setInnerWidth();
  }, []);
  useEffect(() => {
    window.addEventListener("resize", setInnerWidth);
    return () => {
      window.removeEventListener("resize", setInnerWidth);
    };
  }, [innerWidth, setInnerWidth]);

  return (
    <div
      className={`${styles.LoginButton} ${
        innerWidth < innerWidthThreshold && styles.MobileLoginButton
      }`}
    >
      <button
        className={`${logged ? styles.buttonEnable : ""} ${
          innerWidth < innerWidthThreshold && styles.MobileLoginButton
        }`}
        onClick={async () => (logged ? signOut() : signIn(providerName))}
      >
        {logged ? <span>Logado com</span> : <span>Logar com</span>}
        {icon && <FontAwesomeIcon icon={icon} />}
        {logged && innerWidth > innerWidthThreshold && (
          <span>(Aperte para efetuar o logout)</span>
        )}
      </button>
    </div>
  );
}
