import { NextPage } from "next";
import styles from "styles/pages/Page.module.scss";
import Head from "next/head";
const Tests: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lucas | Tests</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.lightBox}>
            <h1> Tests </h1>
          </div>
        </main>
      </div>
    </>
  );
};

export default Tests;
