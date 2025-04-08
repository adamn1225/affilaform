import { generateServerToken } from './jsonwebtoken';

export async function apiFetch(url: string, options: RequestInit = {}) {
  let token: string | undefined;

  // Check if running on the client
  if (typeof window !== 'undefined') {
    token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];
  } else {
    // Generate a server-side token for server-side requests
    token = generateServerToken();
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

  const contentType = res.headers.get('content-type') || '';
  let data;

  if (contentType.includes('application/json')) {
    try {
      data = await res.json();
    } catch {
      console.error('[apiFetch] Invalid JSON in response');
      throw new Error('Invalid JSON in response');
    }
  } else {
    data = null;
  }

  if (!res.ok) {
    console.error(`[apiFetch] Request failed with status: ${res.status}`);
    console.error(`[apiFetch] Response body:`, data);
    throw new Error(data?.error || `API request failed with status ${res.status}`);
  }

  console.log(`[apiFetch] Response data:`, data);
  return data;
}