import { apiFetch } from './apiFetch'

export async function login({ email, password }: { email: string, password: string }) {
  return apiFetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function signup({
  email,
  password,
  company_name,
  role,
}: {
  email: string
  password: string
  company_name: string
  role: 'vendor' | 'affiliate'
}) {
  const res = await fetch(`/api/${role}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, company_name }),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Signup failed')
  }

  return res.json()
}





