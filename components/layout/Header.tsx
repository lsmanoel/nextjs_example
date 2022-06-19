import React, { ReactElement, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import styles from "styles/components/Layout.module.scss";

interface Props {
  title: string;
  buttonFaBarsEnable: boolean;
  onClickFaBars: () => void;
}

export default function Header({
  title,
  buttonFaBarsEnable,
  onClickFaBars,
}: Props): ReactElement {
  return (
    <header
      className={`${styles.header} ${
        buttonFaBarsEnable ? styles.buttonFaBarsEnable : ""
      }`}
    >
      <button
        className={`${buttonFaBarsEnable ? styles.buttonFaBarsEnable : ""}`}
        aria-label="Esconder menu lateral"
        title="Esconder menu lateral"
        onClick={() => onClickFaBars()}
      >
        <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
      </button>
      <div></div>
    </header>
  );
}
