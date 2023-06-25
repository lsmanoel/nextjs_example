import { ReactElement } from "react";
import Image from "next/image";
import { User } from "lib/user";

import styles from "styles/components/chat/UserBox.module.scss";

interface UserBoxProps {
  user: User;
  color?: string;
  selected: boolean;
  onClick: () => void;
}

export default function UserBox(props: UserBoxProps): ReactElement {
  return (
    <div
      className={`${styles.UserBox}
        ${props.color == "success" ? styles.success : ""} 
        ${props.color == "warn" ? styles.warn : ""}
        ${props.color == "error" ? styles.error : ""}
        ${props.selected ? styles.selected : ""}
        `}
    >
      <button
        disabled={props.selected}
        type={"button"}
        onClick={() => props.onClick()}
      >
        <div>
          <div>
            <h1>{props.user.name}</h1>
            <h2>{props.user.email}</h2>
          </div>
          <div id="avatar">
            <Image
              alt="avatar"
              src={props.user.image}
              width={100}
              height={100}
            />
          </div>
        </div>
      </button>
    </div>
  );
}
