import { NextPage } from "next";
import styles from "styles/pages/Page.module.scss";
import Head from "next/head";
const Code: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lucas | Code</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.lightBox}>
            <h1> Code </h1>
          </div>

          <div>
            <h2>Conhecimentos de Programação</h2>
            <ul>
              <li>
                <p>
                  <b>Fullstack Dev</b> (JavaScript, TypeScript, CSS, React,
                  React-Native, Nodejs, Mongodb, NeDB, Firebase)
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

          <div>
            <h2>Pipeline</h2>
            <ul>
              <li>
                <p>
                  <a href="https://github.com/lsmanoel/react_p5_synthesizer">
                    React p5 Synthesizer
                  </a>{" "}
                  [
                  <a href="https://react-p5-synthesizer.herokuapp.com/">DEMO</a>
                  ]
                </p>
              </li>
              <li>
                <p>2. Build do projeto.</p>
              </li>
              <li>
                <p>3. Testes unitário.</p>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </>
  );
};

export default Code;
