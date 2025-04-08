'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' })
      localStorage.removeItem('token')
      router.push('/login')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 bg-zinc-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors shadow-md"
    >
      <LogOut size={18} />
      Logout
    </button>
  )
}
