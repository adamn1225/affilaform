'use client';

import { useEffect, useState } from 'react';
import {
  getAffiliateCommission,
  getAffiliateWallet,
  getAffiliatePayouts,
  AffiliatePayout,
} from '@/lib/api/affiliate';
import toast from 'react-hot-toast';

export default function AffiliateDashboardContent() {
  const [commission, setCommission] = useState<number | ''>('');
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [payouts, setPayouts] = useState<AffiliatePayout[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const [walletRes, commissionRes, payoutsRes] = await Promise.all([
        getAffiliateWallet(),
        getAffiliateCommission(),
        getAffiliatePayouts(),
      ]);

      if (walletRes) setWalletBalance(walletRes.Balance);
      if (commissionRes) setCommission(commissionRes.Commission);
      if (payoutsRes) setPayouts(payoutsRes);
    } catch (err) {
      toast.error('Error loading dashboard data');
      setErrors((prev) => [...prev, 'Failed to load one or more data sources']);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalEarned = payouts.reduce((sum, p) => sum + (p.AffiliateCut || 0), 0);
  const totalPaid = payouts.filter(p => p.Status === 'paid').reduce((sum, p) => sum + (p.AffiliateCut || 0), 0);
  const totalPending = payouts.filter(p => p.Status === 'pending').reduce((sum, p) => sum + (p.AffiliateCut || 0), 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 mt-10 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">Affiliate Dashboard</h1>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <MetricCard label="Wallet Balance" value={`$${walletBalance?.toFixed(2) ?? '0.00'}`} />
        <MetricCard label="Commission Rate" value={commission ? `${(commission * 100).toFixed(1)}%` : 'N/A'} />
        <MetricCard label="Total Payouts" value={payouts.length.toString()} />
        <MetricCard label="Total Earned" value={`$${totalEarned.toFixed(2)}`} />
        <MetricCard label="Total Paid" value={`$${totalPaid.toFixed(2)}`} />
        <MetricCard label="Pending" value={`$${totalPending.toFixed(2)}`} />
      </div>

      {/* Payout Table */}
      <div className="bg-white border rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Payout Details</h2>
        {payouts.length === 0 ? (
          <p className="text-gray-600 text-sm">No payouts available.</p>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-2">Lead ID</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {payouts.map((payout) => (
                  <tr key={payout.ID} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{payout.LeadID}</td>
                    <td className="px-4 py-2">${payout.Amount}</td>
                    <td className="px-4 py-2 capitalize">{payout.Status}</td>
                    <td className="px-4 py-2">{new Date(payout.CreatedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple reusable stat box
function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border rounded-lg shadow px-4 py-5 flex flex-col gap-2">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-bold text-gray-800">{value}</p>
    </div>
  );
}
