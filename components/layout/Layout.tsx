import React, { ReactElement, useState } from "react";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import { useRouter } from "next/router";

import styles from "styles/components/Layout.module.scss";

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
  const [hidden, setHidden] = useState(false);
  const router = useRouter();
  const title = routeTitles[router.pathname] || "";
  return (
    <>
      <Head>
        <title>{`WebRec | ${title || "404"}`}</title>
      </Head>

      <div className={styles.content}>
        <Header
          title={title}
          buttonFaBarsEnable={!hidden}
          onClickFaBars={() => setHidden(!hidden)}
        ></Header>
        <div className={styles.body}>
          <Navigation hidden={hidden}></Navigation>
          <main className={styles.main}>{children}</main>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
