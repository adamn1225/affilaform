import { apiFetch } from './apiFetch'

type Role = 'vendor' | 'affiliate';

interface SignupPayload {
  email: string;
  password: string;
  company_name: string;
  role: Role;
}

export async function signup(data: { email: string; password: string; company_name: string; role: string }) {
  const url = data.role === 'affiliate'
    ? '/api/affiliate/signup'
    : '/api/vendor/signup';

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  let responseBody: any = null;

  try {
    responseBody = await response.json();
  } catch (err) {
    console.error('[signup] Failed to parse JSON from response');
  }

  if (!response.ok) {
    const errorMsg = responseBody?.error || responseBody?.message || 'Signup failed';
    throw new Error(errorMsg);
  }

  return responseBody;
}

export async function login(email: string, password: string) {
  const response = await apiFetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    let errorMessage = 'Login failed';

    try {
      const error = await response.json();
      errorMessage = error.error || error.message || errorMessage;
    } catch {
      const text = await response.text();
      console.error('[login] Raw response:', text);
    }

    throw new Error(errorMessage);
  }

  return response.json();
}
