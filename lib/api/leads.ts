import { apiFetch } from './apiFetch'

export async function getLeadsByForm(formId: string) {
  return apiFetch(`/api/leads?form_id=${formId}`, { method: 'GET' })
}

export type Lead = {
  id: string
  created_at: string
  message?: string
  [key: string]: any
}
