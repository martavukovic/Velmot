"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import Image from "next/image";


export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) => pathname === href;

  const NavLinks = ({ mobile = false }) => (
    <>
      <Link href="/" className={isActive("/") ? styles.active : ""}>Homepage</Link>
      <Link href="/employees" className={isActive("/employees") ? styles.active : ""}>Employees</Link>
      <Link href="/useraccount" className={isActive("/useraccount") ? styles.active : ""}>User Account</Link>
      <Link href="/servicerequest" className={isActive("/servicerequest") ? styles.active : ""}>Service</Link>
      <Link href="/feedback" className={isActive("/feedback") ? styles.active : ""}>Feedback</Link>
      <Link href="/about" className={isActive("/about") ? styles.active : ""}>About Us</Link>
      <Link href="/contact" className={isActive("/contact") ? styles.active : ""}>Contact</Link>

      <Link
        href="/signin"
        className={`${styles.signin} ${
          isActive("/signin") ? styles.activeButton : ""
        }`}
      >
        LogIn
      </Link>
    </>
  );

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <Image
            src="/images/Velmot_logo.png"
            alt="Velmot logo"
            width={140}
            height={40}
            priority
          />
        </div>


        {/* DESKTOP */}
        <nav className={styles.links}>
          <NavLinks />
        </nav>

        {/* HAMBURGER */}
        <button
          className={styles.hamburger}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className={styles.mobileMenu}>
          <NavLinks mobile />
        </div>
      )}
    </header>
  );
}
