import { useState, useEffect } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useSession,
  signIn as singInNextAuth,
  signOut as signOutNextAuth,
  SignInResponse,
} from "next-auth/react";
import {
  getAuth,
  signInAnonymously,
  signOut as signOutFirebase,
} from "firebase/auth";
import { db } from "lib/firebase";

import styles from "styles/components/LoginButton.module.scss";
import { useRouter } from "next/router";

interface Props {
  icon: IconDefinition;
  providerName: string;
}

export default function LoginButton({ icon, providerName }: Props) {
  const session = useSession();
  const logged = session.data?.provider === providerName;
  const router = useRouter();
  const auth = getAuth(db.app);

  const innerWidthThreshold = 1000;
  const [innerWidth, getInnerWidth] = useState(innerWidthThreshold + 1);
  const setInnerWidth = () => {
    getInnerWidth(window.innerWidth);
  };

  async function signInFirebase(): Promise<boolean> {
    if (session.data?.user?.email)
      return await signInAnonymously(auth)
        .then(async () => {
          if (session.data.chatId) {
            return true;
          } else {
            signOutFirebase(auth);
            return false;
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log({ errorCode, errorMessage });
          return false;
        });
    else return false;
  }

  async function singIn() {
    await singInNextAuth(providerName);
    const status = await signInFirebase();
    if (!status) signOut();
  }

  async function signOut() {
    signOutFirebase(auth);
    signOutNextAuth();
  }

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
        onClick={async () => (logged ? signOut() : singIn())}
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
