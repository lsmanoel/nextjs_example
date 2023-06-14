import { ReactElement } from "react";
import styles from "styles/components/chat/Message.module.scss";

interface MessageProps {
  name: string;
  date: string;
  message: string;
  color?: string;
  response?: boolean;
  onUpdate: () => void;
  onDelete: () => void;
}

export default function Message(props: MessageProps): ReactElement {
  return (
    <div className={styles.row}>
      {!props.response && <div className={styles.Space}></div>}
      <div
        className={`${styles.Message}
        ${props.color == "success" ? styles.success : ""} 
        ${props.color == "warn" ? styles.warn : ""}
        ${props.color == "error" ? styles.error : ""}
        `}
      >
        <div className={styles.row}>
          <h1>{props.name}</h1>
          <h1>{props.date}</h1>
          <button onClick={() => props.onUpdate()} />
          <button onClick={() => props.onDelete()} />
        </div>
        <div>
          <h2>{props.message}</h2>
        </div>
      </div>
    </div>
  );
}
