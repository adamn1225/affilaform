'use client';

import { useEffect, useState } from 'react';
import { getAffiliateCommission, getAffiliateWallet, AffiliateCommission, AffiliateWallet, getAffiliatePayouts, AffiliatePayout } from '@/lib/api/affiliate';
import RotatorClickWidget from '@/app/components/widgets/RotatorWidget';
import toast from 'react-hot-toast';

export default function AffiliateDashboardContent() {
  const [commission, setCommission] = useState<number | ''>(''); // For commission rate
  const [walletBalance, setWalletBalance] = useState<number | null>(null); // For wallet balance
  const [loading, setLoading] = useState(true);
  const [affiliateCommission, setAffiliateCommission] = useState<AffiliateCommission | null>(null);
  const [affiliateWallet, setAffiliateWallet] = useState<AffiliateWallet | null>(null);

  const [commissionError, setCommissionError] = useState<string | null>(null);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [payouts, setPayouts] = useState<AffiliatePayout[]>([]); // For payouts
  const [payoutError, setPayoutError] = useState<string | null>(null);
  const fetchPayouts = async () => {
    try {
      const payoutsRes = await getAffiliatePayouts();
      console.log('Fetched Payouts:', payoutsRes); // Debug log
      if (payoutsRes) {
        setPayouts(payoutsRes);
      }
    } catch (err) {
      console.error('Error loading payouts:', err);
      setPayoutError('Failed to load payouts');
    }
  };

  const fetchCommission = async () => {
    try {
      const commissionRes = await getAffiliateCommission();
      console.log('Fetched Affiliate Commission:', commissionRes); // Debug log
      if (commissionRes) {
        setAffiliateCommission(commissionRes);
        setCommission(commissionRes.Commission);
      }
    } catch (err) {
      console.error('Error loading affiliate commission:', err);
      setCommissionError('Failed to load commission');
    }
  };

  const fetchWallet = async () => {
    try {
      const walletRes = await getAffiliateWallet();
      console.log('Fetched Wallet:', walletRes); // Debug log
      if (walletRes) {
        setAffiliateWallet(walletRes);
        setWalletBalance(walletRes?.Balance ?? null); // Use "Balance" here
      }
    } catch (err) {
      console.error('Error loading affiliate wallet:', err);
      setWalletError('Failed to load wallet');
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        await Promise.all([fetchCommission(), fetchWallet(), fetchPayouts()]);
      } catch (err) {
        console.error('Error loading settings:', err);
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    if (commissionError) {
      toast.error(commissionError);
    }
  }, [commissionError]);

  useEffect(() => {
    if (walletError) {
      toast.error(walletError);
    }
  }, [walletError]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-start gap-8 w-full justify-center py-2">
        <div className="w-fit  mt-12">
          <h2 className="text-lg font-semibold mb-2">Affiliate Dashboard</h2>
          <table className="table-auto w-fit text-sm text-left text-gray-700 border border-gray-400">
          <RotatorClickWidget />
            <thead>
              <tr>
                <th className="px-4 py-2">Metric</th>
                <th className="px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Wallet Balance</td>
                <td className="px-4 py-2">${walletBalance?.toFixed(2) ?? '0.00'}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Commission Rate</td>
                <td className="px-4 py-2">{commission ? `${(commission * 100).toFixed(1)}%` : 'N/A'}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Total Payouts</td>
                <td className="px-4 py-2">{payouts.length}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Total Earned</td>
                <td className="px-4 py-2">${payouts.reduce((sum, p) => sum + (p.AffiliateCut || 0), 0).toFixed(2)}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Total Paid</td>
                <td className="px-4 py-2">${payouts.filter(p => p.Status === 'paid').reduce((sum, p) => sum + (p.AffiliateCut || 0), 0).toFixed(2)}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Pending</td>
                <td className="px-4 py-2">${payouts.filter(p => p.Status === 'pending').reduce((sum, p) => sum + (p.AffiliateCut || 0), 0).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {payouts.length === 0 ? (
          <p>No payouts available.</p>
        ) : (
          <div className="mt-14 w-full">
            <h3 className="text-lg font-semibold mb-2">Payout Details</h3>
            <table className="w-full text-sm text-left text-gray-700">
              <thead className='bg-gray-800 border divide-gray-50 divide-x-gray-50'>
                <tr className="text-gray-50 divide-x-1 divide-gray-400">
                  <th className="px-4 py-2">Lead ID</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody className='bg-gray-50 border w-fit border-gray-800'>
                {payouts.map((payout) => (
                  <tr className=' border divide-x-1 divide-gray-950 ' key={payout.ID}>
                    <td className="px-3 py-2">{payout.LeadID}</td>
                    <td className="px-4 py-2">${payout.Amount}</td>
                    <td className="px-4 py-2">{payout.Status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}