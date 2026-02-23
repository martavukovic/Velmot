'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import styles from '../components/navbar/signin.module.css'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (signInError) {
      setError('Neispravan email ili lozinka')
      setLoading(false)
      return
    }

    const user = data.user

    // 🔹 PROVJERA U USERS
    const { data: profile } = await supabase
      .from('users')
      .select('id')
      .eq('id', user.id)
      .single()

    if (!profile) {
      await supabase.auth.signOut()
      setError('Nemate pristup aplikaciji.')
      setLoading(false)
      return
    }

const params = new URLSearchParams(window.location.search);
const redirect = params.get("redirect") || "/";
router.push(redirect);
  }

  return (
    <main className={styles.page}>
      <h1>Prijava</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Lozinka"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button disabled={loading}>
          {loading ? 'Prijava...' : 'Prijavi se'}
        </button>
      </form>
    </main>
  )
}