'use client'

import { useEffect, useState } from 'react'
import { getToken, decodeToken, isTokenExpired, logout } from '@/lib/auth/token'

type User = {
  user_id: string
  role: string
  email?: string
}

export function useCurrentUser(): { user: User | null; loading: boolean } {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (!token || isTokenExpired(token)) {
      logout()
      return
    }

    const decoded = decodeToken(token)
    if (decoded) {
      setUser({
        user_id: decoded.user_id,
        role: decoded.role,
        email: decoded.email,
      })
    }

    setLoading(false)
  }, [])

  return { user, loading }
}
