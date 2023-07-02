import { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

import styles from "styles/components/chat/MessageBox.module.scss";
import { Message } from "lib/chat";
import { Timestamp } from "firebase/firestore";

interface MessageBoxProps {
  message: Message;
  color?: string;
  response?: boolean;
  onUpdate: () => void;
  onDelete: () => void;
}

export default function MessageBox(props: MessageBoxProps): ReactElement {
  const created = new Date((props.message.created as Timestamp).toDate());
  return (
    <div className={styles.row}>
      {!props.response && <div className={styles.Space}></div>}
      <div
        className={`${styles.MessageBox}
        ${props.color == "success" ? styles.success : ""} 
        ${props.color == "warn" ? styles.warn : ""}
        ${props.color == "error" ? styles.error : ""}
        `}
      >
        <div className={`${styles.row} ${styles.spaceBetween}`}>
          <h1>{props.message.name}</h1>
          <div className={styles.row}>
            <div id="date">
              <h1>{format(created, "dd/LL/yy")}</h1>
              <h1>{format(created, "HH:mm:ss")}</h1>
            </div>
            {!props.response && (
              <div>
                <button type={"button"} onClick={() => props.onUpdate()}>
                  <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                </button>

                <button type={"button"} onClick={() => props.onDelete()}>
                  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </button>
              </div>
            )}
          </div>
        </div>
        <div>
          <h2>{props.message.text}</h2>
        </div>
      </div>
    </div>
  );
}
