import { NextPage } from "next";
import styles from "styles/pages/Page.module.scss";
import Head from "next/head";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/protected",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

const ProtectedFile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lucas | Protected File</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.lightBox}>
            <h1> Protected File </h1>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProtectedFile;
