import { NextPage } from "next";
import { CodeBlock, dracula } from "react-code-blocks";
import Head from "next/head";
import styles from "styles/pages/Page.module.scss";
import { useEffect, useState } from "react";
import { BuildStatusBadge } from "react-build-status-badge";
import ChatBox from "components/chat/ChatBox";

const Chat: NextPage = () => {
  const innerWidthThreshold = 1400;
  const mobileWidthThreshold = 800;
  const [innerWidth, getInnerWidth] = useState(0);
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const setInnerWidth = () => {
    getInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    code != "" && setLoading(false);
  }, [code]);
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
        <title>Lucas | Chat</title>
      </Head>
      <div
        className={`${styles.container} ${
          mobileWidthThreshold > innerWidth && styles.containerMobile
        }`}
      >
        {innerWidth ? (
          <main className={styles.main}>
            <div className={styles.lightBox}>
              <h1> Chat </h1>
            </div>
            <ChatBox />
          </main>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Chat;
