import React, { ReactElement, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import styles from "styles/components/Layout.module.scss";

interface Props {
  title: string;
  onClickFaBars: () => void;
}

export default function Header({ title, onClickFaBars }: Props): ReactElement {
  return (
    <header className={styles.header}>
      <button
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
