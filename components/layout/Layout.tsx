import React, { ReactElement, useState } from "react";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import { useRouter } from "next/router";

import styles from "styles/components/Layout.module.scss";
import Messenger from "./Messenger";

const routeTitles: Record<string, string> = {
  "/": "Home",
  "/login": "Login",
  "/login/admin": "Login",
  "/devices": "Devices",
  "/storages": "Storages",
  "/users": "Usuários",
  "/organizations": "Organizations",
  "/groups": "Grupos",
};

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props): ReactElement {
  const [hiddenNav, setHiddenNav] = useState(true);
  const [hiddenMsg, setHiddenMsg] = useState(true);
  const router = useRouter();
  const title = routeTitles[router.pathname] || "";

  const onSubmitMsg = (): void => {
    setHiddenMsg(true);
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
        ></Header>
        <Messenger hidden={hiddenMsg} onSubmit={onSubmitMsg}></Messenger>
        <div className={styles.body}>
          <Navigation hidden={hiddenNav}></Navigation>
          <main className={styles.main}>{children}</main>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
