'use client'

import { useEffect, useState } from 'react'
import { getLeadsByForm, Lead } from '@/lib/api/leads'
import { getMyForms } from '@/lib/api/forms'
import { ChevronUp, ChevronDown } from 'lucide-react' // Import sorting icons

export default function VendorSubmissions() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)

    // Filter leads based on the search query
    const filtered = leads.filter((lead) =>
      lead.Data.name.toLowerCase().includes(query) ||
      lead.Data.email.toLowerCase().includes(query) ||
      lead.Data.phone.toLowerCase().includes(query)
    )
    setFilteredLeads(filtered)
  }

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc'
    setSortField(field)
    setSortOrder(order)

    const sorted = [...filteredLeads].sort((a, b) => {
      const aValue = a[field as keyof Lead] || ''
      const bValue = b[field as keyof Lead] || ''

      if (order === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredLeads(sorted)
  }

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const forms = await getMyForms()
        if (!forms || !Array.isArray(forms) || forms.length === 0) {
          console.warn('[VendorSubmissions] No forms found or invalid response')
          setLoading(false)
          return
        }

        const formId = forms[0].id
        const rawLeads = await getLeadsByForm(formId.toString())

        // Map the raw API response to match the expected structure
        const mappedLeads = rawLeads.map((lead: any) => ({
          id: lead.ID,
          created_at: lead.CreatedAt,
          message: lead.Data?.name?.replace(/[^\x20-\x7E]/g, '') || 'No message',
          IsPaid: lead.IsPaid || false,
          FormID: lead.FormID || '',
          Data: {
            ...lead.Data,
            name: lead.Data?.name?.replace(/[^\x20-\x7E]/g, '') || 'N/A',
          },
        }))

        setLeads(mappedLeads)
        setFilteredLeads(mappedLeads) // Initialize filteredLeads
      } catch (err) {
        console.error('[VendorSubmissions] Failed to fetch leads:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  if (loading) return <p>Loading submissions...</p>

  return (
    <div className=' bg-white p-4 rounded shadow-md'>
      <h2 className="text-xl font-semibold mb-4">Form Submissions</h2>
      {leads.length === 0 ? (
        <p className="text-gray-500">No submissions yet.</p>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search submissions..."
              value={searchQuery}
              onChange={handleSearch}
              className="border border-zinc-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-zinc-800 text-white text-left">
                  <th className="p-1 cursor-pointer" onClick={() => handleSort('FormID')}>
                    <div className="flex items-center">
                      <span>Form ID</span>
                      {sortField === 'FormID' ? (
                        sortOrder === 'asc' ? <ChevronUp size={20} className="ml-1 text-white" /> : <ChevronDown size={20} className="ml-1 text-white" />
                      ) : (
                        <ChevronDown size={20} className="ml-1 text-gray-400" /> // Default icon
                      )}
                    </div>
                  </th>
                  <th className="p-1 cursor-pointer" onClick={() => handleSort('created_at')}>
                    <div className="flex items-center">
                      <span>Submitted</span>
                      {sortField === 'created_at' ? (
                        sortOrder === 'asc' ? <ChevronUp size={20} className="ml-1" /> : <ChevronDown size={20} className="ml-1" />
                      ) : (
                        <ChevronDown size={20} className="ml-1 text-gray-400" /> // Default icon
                      )}
                    </div>
                  </th>
                  <th className="p-1 cursor-pointer" onClick={() => handleSort('IsPaid')}>
                    <div className="flex items-center">
                      <span>Is Paid</span>
                      {sortField === 'IsPaid' ? (
                        sortOrder === 'asc' ? <ChevronUp size={20} className="ml-1" /> : <ChevronDown size={20} className="ml-1" />
                      ) : (
                        <ChevronDown size={20} className="ml-1 text-gray-400" /> // Default icon
                      )}
                    </div>
                  </th>
                  <th className="p-1 cursor-pointer" onClick={() => handleSort('Data.name')}>
                    <div className="flex items-center">
                      <span>Name</span>
                      {sortField === 'Data.name' ? (
                        sortOrder === 'asc' ? <ChevronUp size={20} className="ml-1 text-white" /> : <ChevronDown size={20} className="ml-1 text-white" />
                      ) : (
                        <ChevronDown size={20} className="ml-1 text-gray-400" /> // Default icon
                      )}
                    </div>
                  </th>
                  <th className="p-1">Email</th>
                  <th className="p-1">Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-t">
                    <td className="p-2 text-sm">{lead.FormID}</td>
                    <td className="p-2 text-sm">{new Date(lead.created_at).toLocaleString()}</td>
                    <td className="p-2 text-sm">{lead.IsPaid ? 'Yes' : 'No'}</td>
                    <td className="p-2 text-sm">{lead.Data.name || 'N/A'}</td>
                    <td className="p-2 text-sm">{lead.Data.email || 'N/A'}</td>
                    <td className="p-2 text-sm">{lead.Data.phone || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}