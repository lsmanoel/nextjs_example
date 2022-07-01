import { NextPage } from "next";
import Head from "next/head";
import LoginButton from "components/loginButton";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

import styles from "styles/pages/Page.module.scss";

const Auth: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lucas | auth</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.lightBox}>
            <h1> Autenticação </h1>
          </div>
          <LoginButton providerName="google" icon={faGoogle} />
          <LoginButton providerName="github" icon={faGithub} />
        </main>
      </div>
    </>
  );
};

export default Auth;
