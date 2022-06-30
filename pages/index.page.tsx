import { NextPage } from "next";
import styles from "styles/pages/Page.module.scss";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lucas | Home</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.lightBox}>
            <h1> Título </h1>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
