import { ReactElement, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCode,
  faVial,
  faListCheck,
  faUserCheck,
  faFile,
  faFileShield,
} from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

import styles from "../../styles/components/Layout.module.scss";

const links = [
  { href: "/", value: "Perfil", icon: faHouse },
  { href: "/code", value: "Code", icon: faCode },
  { href: "/tests", value: "Tests", icon: faVial },
  { href: "/cicd", value: "CI/CD", icon: faListCheck },
  { href: "/auth", value: "Auth", icon: faUserCheck },
  {
    href: "/protected-file",
    value: "File",
    icon: faFile,
    securityIcon: faFileShield,
  },
];

interface Props {
  hidden: boolean;
}

export default function Navigation({ hidden }: Props): ReactElement {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <nav className={`${styles.nav} ${hidden ? styles.hidden : ""}`}>
      <div className={styles.links}>
        {links.map(({ href, value, icon, securityIcon }) => (
          <Link key={href} href={href}>
            <a
              className={`${styles.navItem}
              ${href === router.pathname ? styles.selected : ""}
              ${!!securityIcon && !session ? styles.error : ""}`}
            >
              <FontAwesomeIcon
                icon={session ? icon : securityIcon || icon}
              ></FontAwesomeIcon>
              <span>{value}</span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}
