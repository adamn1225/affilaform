import { generateServerToken } from './jsonwebtoken';

export async function apiFetch(url: string, options: RequestInit = {}) {
  let token: string | undefined;

  // Use generateServerToken in server context only
  if (typeof window === 'undefined') {
    token = await generateServerToken();
  } else {
    // Pull from cookie or localStorage on client
    const stored = document.cookie.match(/token=([^;]+)/);
    if (stored) {
      token = stored[1];
    }
  }

  const headers = {
    ...options.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
    'Content-Type': 'application/json',
  };

  const fullUrl = `${process.env.NEXT_PUBLIC_API_LOCAL}${url}`;
  console.log(`[apiFetch] Fetching URL: ${fullUrl}`);

  const res = await fetch(fullUrl, {
    ...options,
    credentials: 'include',
    headers,
  });

  if (res.status === 204) return null;

  const contentType = res.headers.get('content-type') || '';
  let data = null;

  if (contentType.includes('application/json')) {
    try {
      data = await res.json();
    } catch {
      console.error('[apiFetch] Invalid JSON in response');
      throw new Error('Invalid JSON in response');
    }
  }

  if (!res.ok) {
    console.error(`[apiFetch] Request failed with status: ${res.status}`);
    console.error(`[apiFetch] Response body:`, data);
    throw new Error(data?.error || `API request failed with status ${res.status}`);
  }

  return data;
}
