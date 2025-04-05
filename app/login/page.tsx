'use client'

import { useState } from 'react'

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [role, setRole] = useState<'vendor' | 'affiliate'>('vendor')
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_LOCAL}/api/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role }),
        })

        if (res.ok) {
            const data = await res.json()
            localStorage.setItem('admin_token', data.token)
            window.location.href = '/admin/dashboard'
        } else {
            const err = await res.json()
            setError(err.error || 'Login failed')
        }
    }

    return (
       <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
  <h1 className="text-3xl font-semibold text-center mb-6 capitalize">{role} Login</h1>
  <form onSubmit={handleLogin} className="space-y-4">
    {error && <p className="text-sm text-red-600 text-center">{error}</p>}

    <div>
      <label className="block text-sm font-medium mb-1">Email</label>
      <input
        type="email"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">Password</label>
      <input
        type="password"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="••••••••"
        required
      />
    </div>

    <button
      type="submit"
      className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-all"
    >
      Log In
    </button>
  </form>
</div>

    )
}
