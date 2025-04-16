import { apiFetch } from './apiFetch'

export async function getMyForms(): Promise<FormConfig[]> {
  try {
    const response = await apiFetch('/api/vendor/formconfigs')

    if (!response || !Array.isArray(response)) {
      console.error('[getMyForms] Invalid response:', response)
      return []
    }

    return response
  } catch (error) {
    console.error('[getMyForms] Failed to fetch forms:', error)
    return []
  }
}

export async function saveFormConfig(config: FormConfig) {
  const res = await apiFetch(`/api/formconfig`)

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('unauthorized')
    }
    throw new Error('save_failed')
  }

  return await res.json()
}

export type FormConfig = {
  id: number
  form_title: string
  button_text: string
  button_color: string
  fields: any[]
}

export type FormAnalytics = {
  FormID: number
  Views: number
  Submissions: number
}

export async function getFormAnalytics(): Promise<FormAnalytics[]> {
  const res = await apiFetch('/api/vendor/form-analytics')
  if (!res || !Array.isArray(res)) {
    console.error('[getFormAnalytics] Invalid response:', res)
    return []
  }
  return res
}

export type ChartPoint = {
  date: string
  views: number
  submissions: number
}

export async function getFormChartData(formId: number): Promise<ChartPoint[]> {
  const res = await apiFetch(`/api/vendor/form-chart?form_id=${formId}`)
  return res || []
}