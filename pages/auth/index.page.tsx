import { NextPage } from "next";
import Head from "next/head";
import LoginButton from "components/loginButton";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { useSession } from "next-auth/react";
import Image from "next/image";

import styles from "styles/pages/Auth.module.scss";

const Auth: NextPage = () => {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Lucas | auth</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={`${styles.box} ${styles.lightBox}`}>
            <h1> Autenticação </h1>
          </div>
          {session && (
            <div className={`${styles.box} ${styles.center}`}>
              <div className={styles.userData}>
                {session.user?.name && <span>{session.user?.name}</span>}
                {session.user?.email && <span>{session.user?.email}</span>}
              </div>
              <hr />
              {session.user?.image && (
                <div className={styles.img}>
                  <Image
                    alt="avatar"
                    src={session.user.image}
                    width={120}
                    height={120}
                  />
                </div>
              )}
            </div>
          )}
          <LoginButton providerName="google" icon={faGoogle} />
          <LoginButton providerName="github" icon={faGithub} />
        </main>
      </div>
    </>
  );
};

export default Auth;
