'use client'

import { useEffect, useState } from 'react'
import { getLeadsByForm, Lead } from '@/lib/api/leads'
import { getMyForms } from '@/lib/api/forms' // hypothetical helper

export default function VendorSubmissions() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const forms = await getMyForms() // call to GET /api/formconfig for current vendor
        if (!forms.length) return setLoading(false)

        const formId = forms[0].id // just pick the first form for now
        const leads = await getLeadsByForm(formId.toString())
        setLeads(leads)
      } catch (err) {
        console.error('Failed to fetch leads:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  if (loading) return <p>Loading submissions...</p>

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Form Submissions</h2>
      {leads.length === 0 ? (
        <p className="text-gray-500">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Submitted</th>
                <th className="p-2">Message</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t">
                  <td className="p-2 text-sm">{new Date(lead.created_at).toLocaleString()}</td>
                  <td className="p-2 text-sm">{lead.message || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
