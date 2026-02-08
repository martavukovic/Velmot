'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import styles from './register.module.css'

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setError('Lozinke se ne podudaraju')
      return
    }

    setLoading(true)

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }


    const user = data.user

    const { error: dbError } = await supabase.from('users').insert([
      {
        id: user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
      },
    ])

    if (dbError) {
  console.error("Database insert error:", dbError);
  setError("Database error saving new user: " + dbError.message);
}

    setLoading(false)
  }

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

        <button className={styles.button} disabled={loading}>
          {loading ? 'Registracija...' : 'Registriraj se'}
        </button>
      </form>
    </div>
  )
}
