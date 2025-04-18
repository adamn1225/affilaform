'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
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
        body: JSON.stringify({ email, password }), // Only send the body
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Login failed')
      }

      const { user } = await res.json()
      window.location.href = `/vendor/dashboard`
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold capitalize">Vendor Login</h1>
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
      <div className='flex justify-center w-full'>
        <button type="submit" className="bg-black w-1/3 text-white px-4 py-2">Log In</button>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Forgot your password?{' '}
          <a href={`/vendor/reset-password`} className="text-blue-500 hover:underline">
            Reset Password
          </a>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Don't have an account?{' '}
          <a href={`/vendor/signup`} className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
      <div className="text-center flex gap-1 items-center justify-center mt-4">
        <label className="text-sm text-gray-600"></label>
        <input
          type="checkbox"
          className="border p-2 w-4 h-4"
        />
        Remember Me
      </div>
    </form>
  )
}