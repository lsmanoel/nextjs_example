import React, { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import { statusColor } from "lib/statusColor";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import Messenger from "./Messenger";

import styles from "styles/components/Layout.module.scss";

const routeTitles: Record<string, string> = {
  "/": "Home",
};

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props): ReactElement {
  const [hiddenNav, setHiddenNav] = useState(true);
  const [hiddenMsg, setHiddenMsg] = useState(true);
  const [submitMsgStatus, setSubmitMsgStatus] = useState<statusColor>();
  const router = useRouter();
  const title = routeTitles[router.pathname] || "";

  const onSubmitMsg = (status: statusColor): void => {
    setHiddenMsg(!!status);
    setSubmitMsgStatus(status);
  };

  const onClearMsg = (): void => {
    setHiddenMsg(true);
    setSubmitMsgStatus(undefined);
  };

  return (
    <>
      <Head>
        <title>{`WebRec | ${title || "404"}`}</title>
      </Head>

      <div className={styles.content}>
        <Header
          title={title}
          buttonFaBarsEnable={!hiddenNav}
          onClickFaBars={() => setHiddenNav(!hiddenNav)}
          buttonMsgEnable={!hiddenMsg}
          onClickMsg={() => setHiddenMsg(!hiddenMsg)}
          onClickAvatar={() => router.push("/auth")}
          submitMsgStatus={submitMsgStatus}
        ></Header>
        <Messenger
          hidden={hiddenMsg}
          onSubmit={onSubmitMsg}
          onClear={onClearMsg}
        ></Messenger>
        <div className={styles.body}>
          <Navigation hidden={hiddenNav}></Navigation>
          <main className={styles.main}>{children}</main>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
