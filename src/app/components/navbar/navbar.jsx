"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import styles from "./navbar.module.css";

export default function NavbarWithLogin({ force = false }) {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // 🔹 LOGIN STATE (NE DIRAMO IZGLED)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isActive = (href) => pathname === href;

  useEffect(() => {
  const openLogin = () => setShowLogin(true);
  window.addEventListener("open-login", openLogin);
  return () => window.removeEventListener("open-login", openLogin);
}, []);

  // ✅ PROVJERA SESSION (KLJUČNO)
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 30);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  // 🔹 VALIDACIJA (OSTAJE ISTA)
  const validate = () => {
    const newErrors = {};

    if (!email) newErrors.email = "Email je obavezan";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Unesi ispravan email";

    if (!password) newErrors.password = "Lozinka je obavezna";
    else if (password.length < 6)
      newErrors.password = "Lozinka mora imati barem 6 znakova";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 LOGIN
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
      setAuthError("Incorrect email or password.");
      setLoading(false);
      return;
    }

    const user = data.user;

    const { data: profile } = await supabase
      .from("users")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!profile) {
      await supabase.auth.signOut();
      setAuthError("You don't have an account.");
      setLoading(false);
      return;
    }

    setLoading(false);
    setShowLogin(false);

    // ✅ vrati gdje je bio
    const redirect =
      new URLSearchParams(window.location.search).get("redirect") || "/";
    router.push(redirect);
  };

  // 🔹 LOGOUT (NOVO)
const handleLogout = async () => {
  await supabase.auth.signOut();

  // ✅ ako je na request stranici — izbaci ga
  if (pathname === "/servicerequest") {
    router.push("/");
  } else {
    router.refresh();
  }
};

  // 🔹 REQUEST GUARD (NOVO)
const handleRequestClick = async (e) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    e.preventDefault();

    // ✅ dodaj redirect param
    const params = new URLSearchParams(window.location.search);
    params.set("redirect", "/servicerequest");
    window.history.replaceState(null, "", `?${params.toString()}`);

    setShowLogin(true);
    return;
  }
};

// --- NAV LINKOVI ---
const NavLinks = ({ mobile = false }) => (
  <>
    <Link
      href="/"
      className={isActive("/") ? styles.active : ""}
      onClick={() => mobile && setOpen(false)}
    >
      Home
    </Link>

    <Link
      href="/services"
      className={isActive("/services") ? styles.active : ""}
      onClick={() => mobile && setOpen(false)}
    >
      Services
    </Link>

    <Link
      href="/servicerequest"
      onClick={(e) => {
        handleRequestClick(e);
        if (mobile) setOpen(false);
      }}
      className={isActive("/servicerequest") ? styles.active : ""}
    >
      Request
    </Link>

    <Link
      href="/contact"
      className={isActive("/contact") ? styles.active : ""}
      onClick={() => mobile && setOpen(false)}
    >
      Contact
    </Link>

    {!user ? (
      <button
        className={styles.signin}
        onClick={() => {
          setShowLogin(true);
          if (mobile) setOpen(false); // zatvori menu
        }}
      >
        LogIn
      </button>
    ) : (
      <button
        className={styles.signin}
        onClick={() => {
          handleLogout();
          if (mobile) setOpen(false); // zatvori menu
        }}
      >
        Logout
      </button>
    )}
  </>
);

  return (
    
    <>
      {/* NAVBAR */}
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          <div className={styles.logo}>
            <Image
              src="/images/Velmot_logo.png"
              alt="Velmot logo"
              width={170}
              height={10}
              priority
            />
          </div>

          <nav className={styles.links}>
            <NavLinks />
          </nav>

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

        {open && (
          <div className={styles.mobileMenu}>
            <NavLinks mobile />
          </div>
        )}
      </header>

      {/* LOGIN MODAL — OSTAVLJEN TVOJ IZGLED */}
      {showLogin && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            {!force && (
        <button
          className={styles.close}
          onClick={() => {
            setShowLogin(false);

            // ✅ ako je user bio na request pokušaju → vrati na home
            const redirect =
              new URLSearchParams(window.location.search).get("redirect");

            if (redirect === "/servicerequest" || pathname === "/servicerequest") {
              router.push("/");
            }
          }}
          aria-label="Close"
        >
          ×
        </button>
      )}

            <h1 className={styles.title}>Sign In</h1>

            <form
              className={styles.form}
              onSubmit={handleLogin}
              noValidate
            >
              <div className={styles.field}>
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? styles.errorInput : ""}
                  placeholder="email@example.com"
                />
                {errors.email && (
                  <p className={styles.error}>{errors.email}</p>
                )}
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
                {errors.password && (
                  <p className={styles.error}>{errors.password}</p>
                )}
              </div>

              {authError && (
                <p className={styles.error}>{authError}</p>
              )}

              <button
                type="submit"
                className={styles.button}
                disabled={loading}
              >
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