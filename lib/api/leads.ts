import { apiFetch } from './apiFetch'

export async function getLeadsByForm(formId: string) {
  const res = await apiFetch(`/api/leads/${formId}`)

  if (!res || !Array.isArray(res)) {
    console.error('[getLeadsByForm] Invalid response:', res)
    return [] // Return an empty array if the response is invalid
  }

  return res // Return the array directly
}

export type Lead = {
  id: string
  created_at: string
  message?: string
  IsPaid: boolean
  FormID: number
  Data: {
    name: string
    email: string
    phone: string
  },
  [key: string]: any
}