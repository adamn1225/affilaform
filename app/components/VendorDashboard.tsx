'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Import Next.js hook for query parameters
import FormBuilderPage from './FormBuilderPage';
import VendorForms from './VendorForms';
import VendorSubmissions from './VendorSubmissions';
import { apiFetch } from '@/lib/api/apiFetch';

export default function VendorDashboard() {
  const searchParams = useSearchParams(); // Get query parameters
  const initialTab = searchParams.get('tab') || 'forms'; // Get the 'tab' parameter or default to 'forms'
  const [tab, setTab] = useState<'forms' | 'submissions' | 'builder'>(initialTab as 'forms' | 'submissions' | 'builder');
  const [vendor, setVendor] = useState<{ email: string; company_name: string; role: string } | null>(null);

  useEffect(() => {
    console.log('[VendorDashboard] Fetching vendor profile');
    const fetchProfile = async () => {
      const res = await apiFetch('/api/me');
      setVendor(res);
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    // Update the tab state when the query parameter changes
    const currentTab = searchParams.get('tab') || 'forms';
    setTab(currentTab as 'forms' | 'submissions' | 'builder');
  }, [searchParams]);

  if (!vendor) {
    return (
      <div className="p-10 text-center text-gray-600">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  const formConfigDraft = localStorage.getItem('formConfigDraft');
  if (formConfigDraft) {
    const form = JSON.parse(formConfigDraft); // Convert the JSON string back to an object
    console.log('Loaded form draft:', form);
  }

  return (
    <div className="flex flex-col items-center w-full mt-10 space-y-4">
      <div className="flex flex-col items-start w-full px-4">
        <h1 className="text-2xl font-bold">Vendor Dashboard for {vendor.company_name}</h1>
        <p className="text-sm text-gray-500">Logged in as {vendor.email}</p>
        <p className="text-sm text-gray-500">Account Type: {vendor.role}</p>
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

      <div className="w-full max-w-8xl p-4 bg-white">
        {tab === 'forms' && <VendorForms />}
        {tab === 'submissions' && <VendorSubmissions />}
        {tab === 'builder' && <FormBuilderPage />}
      </div>
    </div>
  );
}