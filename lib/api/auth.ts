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
  return apiFetch(`/api/${role}/signup`, {
    method: 'POST',
    body: JSON.stringify({ email, password, company_name }),
  })
}




