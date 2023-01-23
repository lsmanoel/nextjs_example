import { NextPage } from "next";
import { useState, useEffect } from "react";
import styles from "styles/pages/Page.module.scss";
import Head from "next/head";

const Home: NextPage = () => {
  const innerWidthThreshold = 1400;
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
        <title>Lucas | Home</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.lightBox}>
            <h1> Lucas Seara Manoel </h1>
          </div>

          <div
            className={
              innerWidth > innerWidthThreshold ? styles.row : styles.column
            }
          >
            <div className={styles.column}>
              <h2>Resumo </h2>
              <h3>
                Durante a graduação (Engenharia Eletrônica) tive o contato com
                diferentes linguagens de programação, incluindo Python para
                computação científica e processamento de vídeo (OpenCV). Também
                já desenvolvi firmwares utilizando FreeRTOS. Sempre me
                interessei por Inteligência Artificial. Fora da graduação fiz
                cursos de TensorFlow, Keras e Dlib. No último semestre da
                graduação, auxiliei a tese de doutorado de um professor
                utilizando Python, Pandas e Matplotlib para processar dados em
                arquivos de texto provenientes de sensores e apresentar os
                resultados desse processamento. Nesse mesmo semestre, eu e mais
                três colegas, ganhamos o prêmio do Desafio Ifsc Ideias
                Inovadoras. A ideia consistia de um sistema baseado em visão
                computacional para análise de tráfego de veículos e pedestres. O
                objetivo era, por meio dos dados adquiridos, descobrir se há
                falta ou excesso na iluminação pública. A ideia também consistia
                em diminuir ou aumentar a iluminação de acordo com a demanda.
                Meu TCC foi sobre Visão Computacional, utilizei python e C++ e
                linux embarcado com o sistema ROS (Robot Operating System).
                Segue o link do TCC. Gosto bastante de linux. Já utilizei debian
                9 e 10 e o Ubuntu 18 quando desenvolvi com ROS. Após o término
                da graduação trabalhei como freelancer no firmware de um motor
                de popa elétrico controlado remotamente. Utilizei o
                Stm32f103c8t6 e o rádio RF24. Também atuei na criação de
                aplicativos WEB e Mobile. Em seguida, trabalhei para esta mesma
                empresa como programador fullstack freelancer, desenvolvi um
                backend em NodeJs que integrava um banco de dados MongoDB com um
                aplicativo WEB feito com React. Também trabalhei no
                desenvolvimento de um aplicativo Mobile feito com React Native.
                Por interesse, estudei um pouco de TypeScript, TDD e Clean
                Architecture.
              </h3>
            </div>
            <div className={styles.column}>
              <h2>Conhecimentos de Programação</h2>
              <ul>
                <li>
                  <p>
                    <b>Fullstack Dev</b> (JavaScript, TypeScript, CSS, SQL,
                    NextJs, React, React-Native, NodeJs, MongoDB, NeDB,
                    Firebase, Postgres)
                  </p>
                </li>
                <li>
                  <p>
                    <b>AI</b> (python: Keras, Tensorflow, DLib)
                  </p>
                </li>
                <li>
                  <p>
                    <b>ROS</b> (UNIX, C++, Python, cmake)
                  </p>
                </li>
                <li>
                  <p>
                    <b>OpenCV</b> (C++, Python)
                  </p>
                </li>
                <li>
                  <p>
                    <b>Programação de Hardware</b> (VHDL)
                  </p>
                </li>
                <li>
                  <p>
                    <b>Jogos e Animações</b> (Unity, P5, Processing, PyGame)
                  </p>
                </li>
                <li>
                  <p>
                    <b>Firmwares</b> (C, C++, Assembly, FreeRTOS)
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
