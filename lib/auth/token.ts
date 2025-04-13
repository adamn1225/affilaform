export function getToken(): string | null {
  if (typeof document === 'undefined') return null;

  try {
      const match = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/);
      return match ? match[2] : null;
  } catch (err) {
      console.error('Token retrieval error:', err);
      return null;
  }
}


export function decodeToken(token: string): {
  email: string | undefined; exp: number; role: string; user_id: string
} | null {
  try {
    const [, payload] = token.split('.')
    const decoded = JSON.parse(atob(payload))
    return decoded
  } catch {
    return null
  }
}

export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token)
  if (!decoded || !decoded.exp) return true
  const now = Math.floor(Date.now() / 1000)
  return decoded.exp < now
}

export function logout() {
  localStorage.removeItem('token')
  window.location.href = '/login' // or your public homepage
}
