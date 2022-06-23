import React, { ReactElement, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { statusColor } from "lib/statusColor";

import styles from "styles/components/Layout.module.scss";

interface Props {
  title: string;
  buttonFaBarsEnable: boolean;
  onClickFaBars: () => void;
  buttonMsgEnable: boolean;
  submitMsgStatus?: statusColor;
  onClickMsg: () => void;
}

export default function Header({
  buttonFaBarsEnable,
  onClickFaBars,
  buttonMsgEnable,
  submitMsgStatus,
  onClickMsg,
}: Props): ReactElement {
  return (
    <header className={`${styles.header}`}>
      <button
        className={`${buttonFaBarsEnable ? styles.buttonEnable : ""}`}
        aria-label="Esconder menu lateral"
        title="Esconder menu lateral"
        onClick={() => onClickFaBars()}
      >
        <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
      </button>
      <div>
        <button
          className={`${buttonMsgEnable ? styles.buttonEnable : ""}
                    ${submitMsgStatus === "success" ? styles.success : ""}
                    ${submitMsgStatus === "warn" ? styles.warn : ""}
                    ${submitMsgStatus === "error" ? styles.error : ""}`}
          aria-label="Esconder Messenger"
          title="Esconder Messenger"
          onClick={() => onClickMsg()}
        >
          <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
          <span>Envie uma mensagem</span>
        </button>
      </div>
    </header>
  );
}
