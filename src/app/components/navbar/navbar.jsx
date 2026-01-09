"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  return (
    <nav className={styles.navbar}>
      <Link
        href="/"
        className={isActive("/") ? styles.active : ""}
      >
        Početna
      </Link>

      <Link
        href="/employees"
        className={isActive("/employees") ? styles.active : ""}
      >
        Employees
      </Link>

      <Link
        href="/useraccount"
        className={isActive("/useraccount") ? styles.active : ""}
      >
        Korisnički račun
      </Link>

      <Link
        href="/servicerequest"
        className={isActive("/servicerequest") ? styles.active : ""}
      >
        Zahtjev
      </Link>

      <Link
        href="/feedback"
        className={isActive("/feedback") ? styles.active : ""}
      >
        Povratne informacije
      </Link>

      <Link
        href="/about"
        className={isActive("/about") ? styles.active : ""}
      >
        O nama
      </Link>

      <Link
        href="/contact"
        className={isActive("/contact") ? styles.active : ""}
      >
        Kontakt
      </Link>
        
      <Link
      href="/signin"
      className={`${styles.signin} ${
      isActive("/signin") ? styles.activeButton : ""}`}
      >
        Prijava
      </Link>

    </nav>
  );
}
