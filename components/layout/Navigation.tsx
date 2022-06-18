import { ReactElement, useState } from "react";
import Link from "next/link";
import styles from "../../styles/components/Layout.module.scss";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faFolderMinus,
  faServer,
  faBars,
  faBoxArchive,
  faLayerGroup,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import LogoNavigation from "public/logo_navigation.svg";

const links = [
  { href: "/", value: "Tela Inicial", icon: faHouse },
  { href: "/page", value: "Page", icon: faCode },
];

interface Props {
  hidden: boolean;
}

export default function Navigation({ hidden }: Props): ReactElement {
  const router = useRouter();

  return (
    <nav className={`${styles.nav} ${hidden ? styles.hidden : ""}`}>
      <div className={styles.links}>
        {links.map(({ href, value, icon }) => (
          <Link key={href} href={href}>
            <a
              className={`${styles.navItem} ${
                href === router.pathname ? styles.selected : ""
              }`}
            >
              <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
              <span>{value}</span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}
