"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import styles from "./register.module.css";

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

  // 🔐 strong password regex
  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&]).{8,}$/;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // ✅ password strength check
    if (!strongPassword.test(formData.password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character."
      );
      setLoading(false);
      return;
    }

    // ✅ confirm password
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
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
      setError("Error: user ID not available.");
      setLoading(false);
      return;
    }

    // ✅ UPDATE PROFILE
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
      <div className={styles.card}>
        <h1 className={styles.title}>Create Account</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Last Name</label>
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
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className={styles.hint}>
              Minimum 8 characters, uppercase, lowercase, number & symbol
            </span>
          </div>

          <div className={styles.field}>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}
          {success && (
            <p className={styles.success}>✅ Registration successful</p>
          )}

          <button className={styles.button} disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}