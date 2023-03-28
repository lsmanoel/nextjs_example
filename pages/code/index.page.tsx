import { NextPage } from "next";
import styles from "styles/pages/Page.module.scss";
import Head from "next/head";
const Code: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lucas | Code</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.lightBox}>
            <h1> Code </h1>
          </div>

          <div className={styles.column}>
            <h2>Sobre a implementação desse site</h2>
            <h3>
              Esse site foi implementado com o framework{" "}
              <a href="https://nextjs.org/" target="_blank">
                NextJs
              </a>{" "}
              que foi feito em cima do biblioteca{" "}
              <a href="https://react.dev/" target="_blank">
                ReactJs
              </a>
              . Para a estilização foi utilizado o{" "}
              <a href="https://sass-lang.com/" target="_blank">
                Sass
              </a>{" "}
              e para os recursos de login foi utilizado o{" "}
              <a href="https://next-auth.js.org/" target="_blank">
                NextAuth
              </a>
              .
            </h3>
          </div>
        </main>
      </div>
    </>
  );
};

export default Code;
