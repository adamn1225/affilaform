import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

// Helper: verify token with secret
async function verifyToken(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}

// Define protected routes and their required roles
const protectedRoutes: { path: RegExp; role?: string }[] = [
  { path: /^\/vendor(\/|$)/, role: 'vendor' },
  { path: /^\/affiliate(\/|$)/, role: 'affiliate' },
  // Add more patterns here if needed
]

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const url = req.nextUrl.clone()

  for (const route of protectedRoutes) {
    if (route.path.test(url.pathname)) {
      console.log("🌐 Route matched:", url.pathname)
      console.log("🍪 Cookie token:", token)

      if (!token) {
        console.log("🚫 No token found")
        url.pathname = '/login'
        return NextResponse.redirect(url)
      }

      const decoded = await verifyToken(token)
      console.log("🔍 Decoded payload:", decoded)

      if (!decoded || (route.role && decoded.role !== route.role)) {
        console.log("⛔ Unauthorized: Role mismatch or decode failed")
        url.pathname = '/unauthorized'
        return NextResponse.redirect(url)
      }
    }
  }

  return NextResponse.next()
}
