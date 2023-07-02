import type { NextPage } from "next";
import styles from "styles/pages/404.module.scss";

const Protected: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.message}>É preciso logar para entrar no Chat</div>
    </div>
  );
};

export default Protected;
