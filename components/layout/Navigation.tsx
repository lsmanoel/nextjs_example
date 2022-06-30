import { ReactElement, useState } from "react";
import Link from "next/link";
import styles from "../../styles/components/Layout.module.scss";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCode,
  faVial,
  faListCheck,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";

const links = [
  { href: "/", value: "Perfil", icon: faHouse },
  { href: "/code", value: "Code", icon: faCode },
  { href: "/tests", value: "Tests", icon: faVial },
  { href: "/cicd", value: "CI/CD", icon: faListCheck },
  { href: "/auth", value: "Auth", icon: faUserCheck },
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
