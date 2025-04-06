'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // Hit your API to clear cookie server-side
      await fetch('/api/logout', { method: 'POST' })

      // Optional: clear anything from localStorage just in case
      localStorage.removeItem('token')

      // Redirect
      router.push('/login')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-500 border border-gray-300 shadow py-2 px-2 hover:underline"
    >
      Logout
    </button>
  )
}
