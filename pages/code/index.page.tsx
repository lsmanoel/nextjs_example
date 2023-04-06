import { NextPage } from "next";
import styles from "styles/pages/Page.module.scss";
import Head from "next/head";
import { useEffect, useState } from "react";
const Code: NextPage = () => {
  const innerWidthThreshold = 1400;
  const mobileWidthThreshold = 800;
  const [innerWidth, getInnerWidth] = useState(innerWidthThreshold + 1);
  const setInnerWidth = () => {
    console.log(window.innerWidth);
    getInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    setInnerWidth();
  }, []);
  useEffect(() => {
    window.addEventListener("resize", setInnerWidth);
    return () => {
      window.removeEventListener("resize", setInnerWidth);
    };
  }, [innerWidth, setInnerWidth]);
  return (
    <>
      <Head>
        <title>Lucas | Implementação</title>
      </Head>
      <div
        className={`${styles.container} ${
          mobileWidthThreshold > innerWidth && styles.containerMobile
        }`}
      >
        <main className={styles.main}>
          <div className={styles.lightBox}>
            <h1> Implementação </h1>
          </div>

          <div className={styles.column}>
            <h2>Sobre a implementação desse site</h2>
            <h3>
              Esse site foi implementado com o framework{" "}
              <a href="https://nextjs.org/" target="_blank">
                NextJs
              </a>{" "}
              que tem como base a biblioteca{" "}
              <a href="https://react.dev/" target="_blank">
                ReactJs
              </a>
              . Para a estilização foi utilizado o{" "}
              <a href="https://sass-lang.com/" target="_blank">
                Sass
              </a>{" "}
              e para o recurso de login foi utilizado o{" "}
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
