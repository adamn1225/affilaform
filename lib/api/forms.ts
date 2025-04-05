import { apiFetch } from './apiFetch'

export async function getFormConfigs(): Promise<FormConfig[]> {
  return apiFetch('/api/formconfigs', {
    method: 'GET',
  })
}

// Type if needed
export type FormConfig = {
  id: string
  form_title: string
  button_text: string
  button_color: string
  fields: any[]
}
