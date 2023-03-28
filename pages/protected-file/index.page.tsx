import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import styles from "styles/pages/Page.module.scss";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const [name, setName] = useState<string>("");

  useEffect(() => {
    session?.user?.name && setName(session.user.name);
  }, [session]);

  return (
    <>
      <Head>
        <title>Lucas | Protected File</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.lightBox}>
            <h1> Code </h1>
          </div>

          <div className={styles.column}>
            <h2>Sobre o documento protegido</h2>
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

export default ProtectedFile;
