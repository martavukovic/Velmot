"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import styles from "./register.module.css";
import AuthGuard from "../components/AuthGuard";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Lozinke se ne podudaraju");
      setLoading(false);
      return;
    }

    // ✅ SIGN UP
    const { data: signUpData, error: signUpError } =
      await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    const userId = signUpData.user?.id;
    if (!userId) {
      setError("Greška: user ID nije dostupan.");
      setLoading(false);
      return;
    }

    // ✅ UPDATE (NE INSERT!)
    const { error: profileError } = await supabase
      .from("users")
      .update({
        first_name: formData.firstName,
        last_name: formData.lastName,
      })
      .eq("id", userId);

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect") || "/";
    window.location.href = redirect;
  };

  return (
    <div className={styles.page}>
      <h1>Registracija</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Ime</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Prezime</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Lozinka</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Potvrdi lozinku</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>✅ Registracija uspješna</p>}

        <button className={styles.button} disabled={loading}>
          {loading ? "Registracija..." : "Registriraj se"}
        </button>
      </form>
    </div>
  );
}