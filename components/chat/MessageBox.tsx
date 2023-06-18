import { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import styles from "styles/components/chat/Message.module.scss";

interface MessageBoxrops {
  name: string;
  date: string;
  message: string;
  color?: string;
  response?: boolean;
  onUpdate: () => void;
  onDelete: () => void;
}

export default function MessageBox(props: MessageBoxrops): ReactElement {
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
        <div className={`${styles.row} ${styles.spaceBetween}`}>
          <h1>{props.name}</h1>
          <div className={styles.row}>
            <h1>{props.date}</h1>
            {!props.response && (
              <div>
                <button onClick={() => props.onUpdate()}>
                  <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                </button>

                <button onClick={() => props.onDelete()}>
                  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </button>
              </div>
            )}
          </div>
        </div>
        <div>
          <h2>{props.message}</h2>
        </div>
      </div>
    </div>
  );
}
