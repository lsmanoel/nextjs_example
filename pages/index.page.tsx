import { NextPage } from "next";
import { useState, useEffect } from "react";
import styles from "styles/pages/Page.module.scss";
import Head from "next/head";

const Home: NextPage = () => {
  const innerWidthThreshold = 1400;
  const mobileWidthThreshold = 800;
  const [innerWidth, getInnerWidth] = useState(0);
  const setInnerWidth = () => {
    getInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    console.log(innerWidth);
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
      <div
        className={`${styles.container} ${
          mobileWidthThreshold > innerWidth && styles.containerMobile
        }`}
      >
        {innerWidth ? (
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
                  computação científica e processamento de vídeo (OpenCV).
                  Também já desenvolvi firmwares utilizando FreeRTOS. Sempre me
                  interessei por Inteligência Artificial. Fora da graduação fiz
                  cursos de TensorFlow, Keras e Dlib. Desenvolvi um jogo baseado
                  em AI chamado{" "}
                  <a
                    href="https://github.com/lsmanoel/MachineRevolution"
                    target="_blank"
                  >
                    Machine Revolution
                  </a>{" "}
                  . No último semestre da graduação, auxiliei a tese de
                  doutorado de um professor utilizando Python, Pandas e
                  Matplotlib para processar dados provenientes de sensores e
                  apresentar os resultados desse processamento. Nesse mesmo
                  semestre, eu e mais três colegas, ganhamos o prêmio do Desafio
                  Ifsc Ideias Inovadoras. A ideia consistia de um sistema
                  baseado em visão computacional para análise de tráfego de
                  veículos e pedestres. O objetivo era, por meio dos dados
                  adquiridos, descobrir se há falta ou excesso na iluminação
                  pública. A ideia também consistia em diminuir ou aumentar a
                  iluminação de acordo com a demanda. Meu TCC foi sobre Visão
                  Computacional, utilizei Python, C++ e Linux embarcado com o
                  sistema ROS (Robot Operating System). Segue o{" "}
                  <a
                    href="https://drive.google.com/file/d/1Ei1-eol5fQ9zp7CFsud-u0lzOeMOkwBS/view?usp=sharing"
                    target="_blank"
                  >
                    link do TCC
                  </a>{" "}
                  . Após o término da graduação trabalhei como freelancer no
                  firmware de um motor de popa elétrico controlado remotamente
                  que utiliza o microcontrolador Stm32f103c8t6 e o rádio RF24.
                  Também trabalhei na criação de aplicativos WEB e Mobile.
                  Trabalhei como programador fullstack freelancer utilizando
                  ReactJS, React Native, NodeJS e MongoDB. Também já trabalhei
                  com NextJS e deploy em Kubernets na Azure. A maior parte dos
                  meus trabalhos foram com frontend utilizando TypeScript, mas
                  tenho interesse em migrar para trabalhar com backend e data
                  science utilizando Python.
                </h3>
              </div>
              <div className={styles.column}>
                <h2>Conhecimentos de Programação</h2>
                <ul>
                  <li>
                    <p>
                      <b>Fullstack Dev</b> (JavaScript, TypeScript, CSS, SQL,
                      NextJS, ReactJS, React Native, NodeJS, MongoDB, NeDB,
                      Firebase, Postgres)
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>AI</b> (Python: Keras, Tensorflow 1, DLib)
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
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Home;
