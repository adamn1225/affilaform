'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getToken, decodeToken, isTokenExpired, logout as clearToken } from '@/lib/auth/token'

type User = {
  user_id: string
  role: string
  email?: string
}

type UserContextType = {
  user: User | null
  loading: boolean
  logout: () => void
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (!token || isTokenExpired(token)) {
      clearToken()
      setLoading(false)
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

  const logout = () => {
    clearToken()
    setUser(null)
    window.location.href = '/login'
  }

  return (
    <UserContext.Provider value={{ user, loading, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
