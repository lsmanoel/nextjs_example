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
          <h1> Tests </h1>
        </main>
      </div>
    </>
  );
};

export default Tests;
