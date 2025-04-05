'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useUserContext } from '@/context/UserContext'

export function useRequireAuth(requiredRole?: 'vendor' | 'affiliate') {
  const { user, loading, logout } = useUserContext()
  const router = useRouter()
  const pathname = usePathname() // Get the current path

  useEffect(() => {
    if (loading) return // Wait until user info is loaded

    // Prevent redirect loop if already on the login or signup page
    if (!user && pathname !== '/login' && pathname !== '/signup') {
      router.push('/login')
      return
    }

    // Redirect to unauthorized page if the role doesn't match
    if (requiredRole && user?.role !== requiredRole) {
      router.push('/unauthorized')
      return
    }
  }, [user, loading, requiredRole, router, pathname])

  return { user, loading, logout }
}