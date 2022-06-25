import { NextPage } from "next";
import styles from "styles/pages/Page.module.scss";
import Head from "next/head";
const CICD: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lucas | CI/CD</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.lightBox}>
            <h1> CI/CD </h1>
          </div>
        </main>
      </div>
    </>
  );
};

export default CICD;
