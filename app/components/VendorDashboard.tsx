'use client'

import { useEffect, useState } from 'react'
import FormBuilderPage from './FormBuilderPage'
import VendorForms from './VendorForms'
import VendorSubmissions from './VendorSubmissions'
import LogoutButton from '@/components/ui/LogoutButton'

export default function VendorDashboard() {
  const [tab, setTab] = useState<'forms' | 'submissions' | 'builder'>('forms')
  const [vendor, setVendor] = useState<{ email: string; company_name: string, role: string } | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_LOCAL}/api/me`, {
        method: 'GET',
        credentials: 'include',
      })

      if (!res.ok) {
        console.error('Failed to fetch vendor profile')
        return
      }

      const data = await res.json()
      setVendor(data)
    }

    fetchProfile()
  }, [vendor])

  return (
    <div className="flex flex-col items-center w-full mt-10 space-y-4">
      <div className='flex flex-col items-start w-full px-4'>
        <h1 className="text-2xl font-bold">Vendor Dashboard for {vendor?.company_name} </h1>
        <p className="text-sm text-gray-500">Logged in as {vendor?.email} </p>
        <p className="text-sm text-gray-500">Account Type: {vendor?.role} </p>
      </div>
      <div className="flex justify-between items-center mb-4">
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
      </div>

      <div className="border rounded-xl p-4 bg-white">
        {tab === 'forms' && <VendorForms />}
        {tab === 'submissions' && <VendorSubmissions />}
        {tab === 'builder' && <FormBuilderPage />}
      </div>
    </div>
  )
}
