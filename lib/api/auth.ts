import { apiFetch } from './apiFetch'

export async function login({ email, password }: { email: string, password: string }) {
  return apiFetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

type Role = 'vendor' | 'affiliate'

export async function signup({
  email,
  password,
  company_name,
  role,
}: {
  email: string
  password: string
  company_name: string
  role: Role
}) {
  return apiFetch('/api/' + role + '/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, company_name }),
  })
}




