import { NextPage } from "next";
import styles from "../styles/Home.module.scss";
import Head from "next/head";
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lucas | Head</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1> Título </h1>
        </main>
      </div>
    </>
  );
};

export default Home;
