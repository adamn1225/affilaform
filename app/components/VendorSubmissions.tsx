'use client'

import { useEffect, useState } from 'react'
import { getLeadsByForm, Lead } from '@/lib/api/leads'

export default function VendorSubmissions() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  // TEMP: pull from a specific form ID for now
  const formId = 'your-form-id-here'

  useEffect(() => {
    getLeadsByForm(formId)
      .then(setLeads)
      .finally(() => setLoading(false))
  }, [formId])

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
