'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LoginFormProps {
  role: 'vendor' | 'affiliate'
}

export default function LoginForm({ role }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Login failed')
      }

      const { user } = await res.json()
      window.location.href = `/${user.role}/dashboard`
    } catch (err: any) {
      setError(err.message)
    }
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold capitalize">{role} Login</h1>
      {error && <p className="text-red-600">{error}</p>}
      <input
        className="border p-2 w-full"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit" className="bg-black text-white px-4 py-2">Log In</button>
    </form>
  )
}
