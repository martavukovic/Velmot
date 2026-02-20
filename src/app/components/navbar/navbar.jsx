"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import styles from "./navbar.module.css";


export default function NavbarWithLogin() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false); // mobile menu
  const [showLogin, setShowLogin] = useState(false); // login modal

  // --- LOGIN STATE ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isActive = (href) => pathname === href;

  // --- VALIDACIJA LOGIN FORME ---
  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email je obavezan";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Unesi ispravan email";

    if (!password) newErrors.password = "Lozinka je obavezna";
    else if (password.length < 6) newErrors.password = "Lozinka mora imati barem 6 znakova";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- HANDLE SUBMIT LOGIN ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError(null);
    if (!validate()) return;

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError("Neispravan email ili lozinka");
      setLoading(false);
      return;
    }

    const user = data.user;

    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("id")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      await supabase.auth.signOut();
      setAuthError("Nemate pristup aplikaciji.");
      setLoading(false);
      return;
    }

    setLoading(false);
    setShowLogin(false); // zatvori modal
    router.push("/");
  };

  // --- NAV LINKOVI ---
  const NavLinks = ({ mobile = false }) => (
    <>
      <Link href="/" className={isActive("/") ? styles.active : ""}>Home</Link>
      <Link href="/services" className={isActive("/services") ? styles.active : ""}>Services</Link>
      <Link href="/servicerequest" className={isActive("/servicerequest") ? styles.active : ""}>Request</Link>
      <Link href="/about" className={isActive("/about") ? styles.active : ""}>About</Link>
      <Link href="/contact" className={isActive("/contact") ? styles.active : ""}>Contact</Link>
      <button className={styles.signin} onClick={() => setShowLogin(true)}>LogIn</button>
    </>
  );

  return (
    <>
      {/* NAVBAR */}
      <header className={styles.navbar}>
        <div className={styles.inner}>
          <div className={styles.logo}>
            <Image src="/images/Velmot_logo.png" alt="Velmot logo" width={170} height={10} priority />
          </div>

          <nav className={styles.links}>
            <NavLinks />
          </nav>

          <button className={styles.hamburger} onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <span />
            <span />
            <span />
          </button>
        </div>

        {open && <div className={styles.mobileMenu}><NavLinks mobile /></div>}
      </header>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <button className={styles.close} onClick={() => setShowLogin(false)} aria-label="Close">×</button>
            <h1 className={styles.title}>Sign In</h1>

            <form className={styles.form} onSubmit={handleLogin} noValidate>
              <div className={styles.field}>
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? styles.errorInput : ""}
                  placeholder="email@example.com"
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
              </div>

              <div className={styles.field}>
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? styles.errorInput : ""}
                  placeholder="••••••••"
                />
                {errors.password && <p className={styles.error}>{errors.password}</p>}
              </div>

              {authError && <p className={styles.error}>{authError}</p>}

              <button type="submit" className={styles.button} disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className={styles.registerText}>
              No account? <a href="/register">Register</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
