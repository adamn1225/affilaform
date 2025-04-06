import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function getUserFromServer(): Promise<{ user_id: string; role: string } | null> {
  const token = (await cookies()).get('token')?.value
  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!) as { user_id: string; role: string }
    return { user_id: decoded.user_id, role: decoded.role }
  } catch {
    return null
  }
}
