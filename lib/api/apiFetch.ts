export async function apiFetch(url: string, options: RequestInit = {}) {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];

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

  let data;
  const contentType = res.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    try {
      data = await res.json();
    } catch {
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

  if (!contentType.includes('application/json')) {
    console.warn(`[apiFetch] Unexpected content-type: ${contentType}`);
    const text = await res.text();
    console.warn(`[apiFetch] Response text: ${text}`);
  }

  return data;
}