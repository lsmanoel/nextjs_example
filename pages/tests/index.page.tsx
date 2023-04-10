import { NextPage } from "next";
import styles from "styles/pages/Page.module.scss";
import Head from "next/head";
import { useEffect, useState } from "react";
const Tests: NextPage = () => {
  const mobileWidthThreshold = 800;
  const [innerWidth, getInnerWidth] = useState(0);
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
        <title>Lucas | Testes Unitários</title>
      </Head>
      <div
        className={`${styles.container} ${
          mobileWidthThreshold > innerWidth && styles.containerMobile
        }`}
      >
        {innerWidth ? (
          <main className={styles.main}>
            <div className={styles.lightBox}>
              <h1> Testes Unitários </h1>
            </div>

            <div className={styles.column}>
              <h2>Sobre os Testes </h2>
              <h3>
                Os testes desse site foram implementados com{" "}
                <a href="https://jestjs.io/pt-BR/" target="_blank">
                  Jest
                </a>{" "}
                para testar o código que é feito em TypeScript puro. Para a
                parte que utiliza código TSX, que é referente ao ReactJs, foi
                utilizado o módulo{" "}
                <a href="https://jestjs.io/pt-BR/" target="_blank">
                  Testing Library
                </a>{" "}
                que permite testar os elementos do DOM.
              </h3>
            </div>
          </main>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Tests;
