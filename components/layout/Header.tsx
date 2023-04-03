import React, { ReactElement, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { statusColor } from "lib/statusColor";

import styles from "styles/components/Layout.module.scss";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

interface Props {
  buttonFaBarsEnable: boolean;
  onClickFaBars: () => void;
  buttonMsgEnable: boolean;
  submitMsgStatus?: statusColor;
  onClickMsg: () => void;
  onClickAvatar: () => void;
}

export default function Header({
  buttonFaBarsEnable,
  onClickFaBars,
  buttonMsgEnable,
  submitMsgStatus,
  onClickMsg,
  onClickAvatar,
}: Props): ReactElement {
  const { data: session } = useSession();
  return (
    <header className={`${styles.header}`}>
      <button
        className={`${buttonFaBarsEnable ? styles.buttonEnable : ""}`}
        aria-label="Esconder menu lateral"
        onClick={() => onClickFaBars()}
      >
        <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
      </button>
      <div>
        {session?.user?.image && (
          <Tippy content={"Página de Autenticação"}>
            <button className={styles.avatar} onClick={() => onClickAvatar()}>
              <Image
                alt="avatar"
                src={session.user.image}
                width={38}
                height={38}
              />
            </button>
          </Tippy>
        )}

        <Tippy content={"Link para o projeto"}>
          <button
            className={styles.iconButton}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              window.open(
                "https://github.com/lsmanoel/nextjs_example",
                "_blank"
              );
            }}
          >
            <FontAwesomeIcon icon={faGithub} size="xl"></FontAwesomeIcon>
          </button>
        </Tippy>

        <Tippy content={"Eenvie uma mensagem para o Lucas"}>
          <button
            className={`${buttonMsgEnable ? styles.buttonEnable : ""}
                      ${submitMsgStatus === "success" ? styles.success : ""}
                      ${submitMsgStatus === "warn" ? styles.warn : ""}
                      ${submitMsgStatus === "error" ? styles.error : ""}`}
            aria-label="Esconder Messenger"
            onClick={() => onClickMsg()}
          >
            <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
            <span>Envie uma mensagem</span>
          </button>
        </Tippy>
      </div>
    </header>
  );
}
