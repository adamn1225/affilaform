'use client'

import { useEffect, useState } from 'react'
import FormBuilderPage from './FormBuilderPage'
import VendorForms from './VendorForms'
import VendorSubmissions from './VendorSubmissions'

export default function VendorDashboard() {
  const [tab, setTab] = useState<'forms' | 'submissions' | 'builder'>('forms')
  const [vendor, setVendor] = useState<{ email: string; company_name: string } | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1]
  
      if (!token) return // or redirect to login
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_LOCAL}/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  
      if (!res.ok) {
        console.error('Failed to fetch vendor profile')
        return
      }
  
      const data = await res.json()
      setVendor(data)
    }
  
    fetchProfile()
  }, [])
  

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setTab('forms')}
            className={`px-4 py-2 rounded ${tab === 'forms' ? 'bg-black text-white' : 'bg-gray-200'}`}
          >
            Your Forms
          </button>
          <button
            onClick={() => setTab('submissions')}
            className={`px-4 py-2 rounded ${tab === 'submissions' ? 'bg-black text-white' : 'bg-gray-200'}`}
          >
            Submissions
          </button>
          <button
            onClick={() => setTab('builder')}
            className={`px-4 py-2 rounded ${tab === 'builder' ? 'bg-black text-white' : 'bg-gray-200'}`}
          >
            + New Form
          </button>
        </div>
        <button
  onClick={() => {
    localStorage.removeItem('token')
    document.cookie = `token=; path=/; max-age=0`
    window.location.href = '/login'
  }}
  className="text-sm text-red-500"
>
  Logout
</button>
      </div>

      <div className="border rounded-xl p-4 bg-white">
        {tab === 'forms' && <VendorForms />}
        {tab === 'submissions' && <VendorSubmissions />}
        {tab === 'builder' && <FormBuilderPage />}
      </div>
    </div>
  )
}
