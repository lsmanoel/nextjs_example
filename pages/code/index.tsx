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
          <h1> Code </h1>
        </main>
      </div>
    </>
  );
};

export default Code;
