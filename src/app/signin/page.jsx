"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import styles from "./signin.module.css";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(false);

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

    // 1️⃣ Supabase Auth login
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

    // 2️⃣ Provjera postoji li user u users tablici
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("id")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      // ❌ ako nije u bazi → logout
      await supabase.auth.signOut();
      setAuthError("Nemate pristup aplikaciji.");
      setLoading(false);
      return;
    }

    // 3️⃣ OK → redirect
    router.push("/");
  };

  return (
    <main className={styles.page}>
      <h1>Prijava</h1>

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
          <label>Lozinka</label>
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
          {loading ? "Prijava..." : "Prijavi se"}
        </button>
      </form>

      <p className={styles.registerText}>
        Nemaš račun? <a href="/register">Registriraj se</a>
      </p>
    </main>
  );
}
