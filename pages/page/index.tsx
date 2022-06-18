import { NextPage } from "next";
import styles from "styles/pages/Page.module.scss";
import Head from "next/head";
const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lucas | Head</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1> Page </h1>
        </main>
      </div>
    </>
  );
};

export default Page;
