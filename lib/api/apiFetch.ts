export async function apiFetch<T = any>(
    url: string,
    options: RequestInit = {},
  ): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
      ...options,
      headers,
    })
  
    let data
    try {
      data = await res.json()
    } catch {
      throw new Error('Invalid server response')
    }
  
    if (!res.ok) {
      throw new Error(data.error || 'Request failed')
    }
  
    return data
  }
  