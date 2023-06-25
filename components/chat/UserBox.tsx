import { ReactElement } from "react";
import Image from "next/image";
import { User } from "lib/user";

import styles from "styles/components/chat/UserBox.module.scss";

interface UserBoxProps {
  user: User;
  color?: string;
  onClick: () => void;
}

export default function UserBox(props: UserBoxProps): ReactElement {
  return (
    <div
      className={`${styles.UserBox}
        ${props.color == "success" ? styles.success : ""} 
        ${props.color == "warn" ? styles.warn : ""}
        ${props.color == "error" ? styles.error : ""}
        `}
    >
      <button type={"button"} onClick={() => props.onClick()}>
        <div className={`${styles.row} ${styles.spaceBetween}`}>
          <div>
            <h1>{props.user.name}</h1>
            <h2>{props.user.email}</h2>
          </div>
          <Image alt="avatar" src={props.user.image} width={38} height={38} />
        </div>
      </button>
    </div>
  );
}
