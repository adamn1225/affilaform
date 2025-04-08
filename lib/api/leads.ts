import { apiFetch } from './apiFetch'

export async function getLeadsByForm(formId: string) {
  const res = await apiFetch(`/api/leads?form_id=${formId}`)
  return res.leads
}
export type Lead = {
  id: string
  created_at: string
  message?: string
  [key: string]: any
}
