import React, { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import { statusColor } from "lib/statusColor";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import Messenger from "./Messenger";
import styles from "styles/components/Layout.module.scss";
import sendEmail from "lib/emailjs/sendEmail";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props): ReactElement {
  const [hiddenNav, setHiddenNav] = useState(true);
  const [hiddenMsg, setHiddenMsg] = useState(true);
  const [submitMsgStatus, setSubmitMsgStatus] = useState<statusColor>();
  const router = useRouter();

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
      <div className={styles.content}>
        <Header
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
          sendEmail={sendEmail}
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
