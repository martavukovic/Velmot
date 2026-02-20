// SignInPopup.jsx
/*"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import styles from "./signin.module.css";

export default function SignInForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email je obavezan";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Unesi ispravan email";
    }

    if (!password) {
      newErrors.password = "Lozinka je obavezna";
    } else if (password.length < 6) {
      newErrors.password = "Lozinka mora imati barem 6 znakova";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
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

    router.push("/");
  };

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          className={styles.close}
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          ×
        </button>

        <h1 className={styles.title}>Sign In</h1>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
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
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
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
  );
}*/


