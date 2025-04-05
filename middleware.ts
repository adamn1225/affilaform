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
      if (!token) {
        url.pathname = '/login' // or send them to the role-specific login page
        return NextResponse.redirect(url)
      }

      const decoded = await verifyToken(token)
      if (!decoded || (route.role && decoded.role !== route.role)) {
        url.pathname = '/unauthorized'
        return NextResponse.redirect(url)
      }
    }
  }

  return NextResponse.next()
}
