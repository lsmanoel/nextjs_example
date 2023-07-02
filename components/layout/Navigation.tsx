import { ReactElement, useEffect, useState } from "react";
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
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

import styles from "../../styles/components/Layout.module.scss";

const links = [
  { href: "/", value: "Perfil", icon: faHouse },
  { href: "/code", value: "Implementação", icon: faCode },
  { href: "/tests", value: "Testes Unitários", icon: faVial },
  { href: "/cicd", value: "CI/CD", icon: faListCheck },
  { href: "/auth", value: "Autenticação", icon: faUserCheck },
  {
    href: "/chat",
    value: "Chat",
    icon: faComments,
    securityIcon: faComments,
  },
];

interface Props {
  hidden: boolean;
}

export default function Navigation({ hidden }: Props): ReactElement {
  const router = useRouter();
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<number>(1);
  const innerWidthThreshold = 800;
  const [innerWidth, getInnerWidth] = useState(innerWidthThreshold + 1);
  const setInnerWidth = () => {
    getInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    setInnerWidth();
  }, []);
  useEffect(() => {
    window.addEventListener("resize", setInnerWidth);
    return () => {
      window.removeEventListener("resize", setInnerWidth);
    };
  }, [innerWidth, setInnerWidth]);

  return (
    <nav
      className={`${styles.nav} ${
        innerWidth < innerWidthThreshold ? styles.navMobile : ""
      } ${hidden ? styles.hidden : ""}`}
    >
      <div className={styles.links}>
        {links.map(({ href, value, icon, securityIcon }) => (
          <Link key={href} href={href}>
            <a
              className={`${styles.navItem} 
              ${
                notifications.toString().length === 1 && notifications > 0
                  ? styles.oneDigits
                  : ""
              }
              ${notifications.toString().length === 2 ? styles.twoDigits : ""}
              ${notifications.toString().length === 3 ? styles.threeDigits : ""}
              ${notifications.toString().length === 4 ? styles.fourDigits : ""}
              ${notifications.toString().length === 5 ? styles.fiveDigits : ""}
              ${
                href === router.pathname ||
                `${href}/protected` === router.pathname
                  ? styles.selected
                  : ""
              }
              ${!!securityIcon && !session ? styles.error : ""}`}
            >
              <FontAwesomeIcon
                icon={session ? icon : securityIcon || icon}
              ></FontAwesomeIcon>
              {notifications > 0 && <span id="badge">{notifications}</span>}
              <span id="value">{value}</span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}
