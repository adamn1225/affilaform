'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FormPage from './formbuilder/FormPage';
import VendorForms from './VendorForms';
import VendorSubmissions from './VendorSubmissions';
import VendorSettings from './VendorSettings';
import { getVendorWallet, Wallet } from '@/lib/api/vendor';
import { apiFetch } from '@/lib/api/apiFetch';

export default function VendorDashboard() {
  const searchParams = useSearchParams();
  const validTabs = ['forms', 'submissions', 'builder', 'vendorsettings'] as const;
  type TabKey = typeof validTabs[number];

  const initialTab = searchParams.get('tab');
  const [tab, setTab] = useState<TabKey>(validTabs.includes(initialTab as TabKey) ? (initialTab as TabKey) : 'forms');

  const [vendor, setVendor] = useState<{ email: string; company_name: string; role: string } | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [formDraft, setFormDraft] = useState<any | null>(null);

  // Fetch vendor profile
  useEffect(() => {
    console.log('[VendorDashboard] Fetching vendor profile');
    const fetchProfile = async () => {
      const res = await apiFetch('/api/me');
      setVendor(res);
    };
    fetchProfile();
  }, []);

  // Update the tab state when the query parameter changes
  useEffect(() => {
    const currentTab = searchParams.get('tab') || 'forms';
    setTab(currentTab as 'forms' | 'submissions' | 'builder');
  }, [searchParams]);

  // Load form draft from localStorage
  useEffect(() => {
    const formConfigDraft = localStorage.getItem('formConfigDraft');
    if (formConfigDraft) {
      const form = JSON.parse(formConfigDraft);
      console.log('Loaded form draft:', form);
      setFormDraft(form);
    }
  }, []);

  // Fetch wallet balance
  useEffect(() => {
    const getWallet = async () => {
      try {
        const walletRes = await getVendorWallet();
        if (walletRes) {
          console.log('[VendorDashboard] Setting wallet:', walletRes);
          setWallet(walletRes);
        } else {
          console.log('[VendorDashboard] Wallet response is null or invalid');
          setWallet(null); // Explicitly set wallet to null
        }
      } catch (err) {
        console.error('[VendorDashboard] Failed to fetch wallet:', err);
        setWallet(null); // Handle error by setting wallet to null
      }
    };
    getWallet();
  }, []);

  if (!vendor) {
    return (
      <div className="p-10 text-center text-gray-600">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full mt-10 space-y-4">
      <div className="flex flex-col items-start w-full px-4">
        <h1 className="text-2xl font-bold">Vendor Dashboard for {vendor.company_name}</h1>
        <p className="text-sm text-gray-500">Logged in as {vendor.email}</p>
        <p className="text-sm text-gray-500">Account Type: {vendor.role}</p>
        {wallet ? (
          <div>
            <p className="text-xl font-mono text-green-600">${wallet.balance?.toFixed(2) ?? '0.00'}</p>
            {(wallet.balance !== null && wallet.balance !== undefined && Number(wallet.balance) < 25 && (
              <p className="text-sm text-red-500">
                Balance is below minimum required to process payouts.
              </p>
            ))}
          </div>
        ) : (
          <div>Wallet information is unavailable.</div>
        )}
      </div>

      <div className="flex justify-end w-full max-w-6xl px-4 gap-1 mt-4">
        <button
          onClick={() => setTab('forms')}
          className={`px-4 py-2 rounded-t-lg ${tab === 'forms' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Forms
        </button>
        <button
          onClick={() => setTab('submissions')}
          className={`px-4 py-2 rounded-t-lg ${tab === 'submissions' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Submissions
        </button>
        <button
          onClick={() => setTab('builder')}
          className={`px-4 py-2 rounded-t-lg ${tab === 'builder' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Form Builder
        </button>
        <button
          onClick={() => setTab('vendorsettings')}
          className={`px-4 py-2 rounded-t-lg ${tab === 'vendorsettings' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Wallet & Commission Settings
        </button>
      </div>

      <div className="w-full max-w-8xl p-4 bg-gray-50">
        {tab === 'forms' && <VendorForms />}
        {tab === 'submissions' && <VendorSubmissions />}
        {tab === 'builder' && <FormPage />}
        {tab === 'vendorsettings' && <VendorSettings />}
      </div>
    </div>
  );
}