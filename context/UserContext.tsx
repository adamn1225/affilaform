// /context/UserContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { decodeToken, getToken, isTokenExpired } from '@/lib/auth/token'

interface AuthContextValue {
  user: { email?: string; role: string; user_id: string } | null
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthContextValue['user']>(null)

  useEffect(() => {
    const token = getToken()
    if (token && !isTokenExpired(token)) {
      const decoded = decodeToken(token)
      setUser(decoded)
    } else {
      setUser(null)
    }
  }, [])

  const logout = () => {
    fetch('/api/logout', { method: 'POST' })
      .finally(() => {
        window.location.href = '/login'
      })
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
