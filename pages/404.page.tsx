import type { NextPage } from "next";
import styles from "styles/pages/404.module.scss";

const NotFound: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.code}>404</div>
      <div className={styles.message}>Página não encontrada</div>
    </div>
  );
};

export default NotFound;
