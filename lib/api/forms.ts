import { apiFetch } from './apiFetch'

export async function getMyForms(): Promise<FormConfig[]> {
  return apiFetch('/api/vendor/formconfigs', {
    method: 'GET',
    credentials: 'include',
  })
}

export async function saveFormConfig(config: FormConfig) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_LOCAL}/api/formconfig`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  })

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('unauthorized')
    }
    throw new Error('save_failed')
  }

  return await res.json()
}

export type FormConfig = {
  id: string
  form_title: string
  button_text: string
  button_color: string
  fields: any[]
}
