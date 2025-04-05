'use client'

import { useState } from 'react'
import FormBuilderPage from './FormBuilderPage'
import VendorForms from './VendorForms'
import VendorSubmissions from './VendorSubmissions'

export default function VendorDashboard() {
  const [tab, setTab] = useState<'forms' | 'submissions' | 'builder'>('forms')

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
      </div>

      <div className="border rounded-xl p-4 bg-white">
        {tab === 'forms' && <VendorForms />}
        {tab === 'submissions' && <VendorSubmissions />}
        {tab === 'builder' && <FormBuilderPage />}
      </div>
    </div>
  )
}
