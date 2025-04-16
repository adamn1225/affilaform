'use client';

import { useEffect, useState } from 'react';
import {
  getAffiliateCommission,
  getAffiliateWallet,
  getAffiliatePayouts,
  AffiliatePayout,
} from '@/lib/api/affiliate';
import toast from 'react-hot-toast';
import AffiliateCharts from './AffiliateCharts';
import AffiliateIntegrations from './widgets/AffiliateIntegrations';
import { IntegrationCard } from '@/components/widgets/IntegrationCard';
import GA4Toggle from '@/components/widgets/GA4Toggle';

export default function AffiliateDashboardContent() {
  const [commission, setCommission] = useState<number | ''>('');
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [payouts, setPayouts] = useState<AffiliatePayout[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'payouts' | 'charts' | 'integrations'>('payouts');

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
  const totalPaid = payouts.filter((p) => p.Status === 'paid').reduce((sum, p) => sum + (p.AffiliateCut || 0), 0);
  const totalPending = payouts.filter((p) => p.Status === 'pending').reduce((sum, p) => sum + (p.AffiliateCut || 0), 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 mt-10 max-w-7xl mx-auto">
      {/* Sidebar */}
      <AffiliateIntegrations activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Affiliate Dashboard</h1>
        </div>

        {activeTab === 'payouts' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Payout Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <MetricCard label="Total Payouts" value={payouts.length.toString()} />
              <MetricCard label="Total Earned" value={`$${totalEarned.toFixed(2)}`} />
              <MetricCard label="Total Paid" value={`$${totalPaid.toFixed(2)}`} />
              <MetricCard label="Pending" value={`$${totalPending.toFixed(2)}`} />
              <MetricCard label="Commission Rate" value={commission ? `${(commission * 100).toFixed(1)}%` : 'N/A'} />
              <MetricCard label="Wallet Balance" value={`$${walletBalance?.toFixed(2) ?? '0.00'}`} />
            </div>
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
        )}

        {activeTab === 'charts' && (
          <div>
            <AffiliateCharts
              ctrData={[
                { date: '2025-04-10', ctr: 5.2 },
                { date: '2025-04-11', ctr: 4.8 },
                { date: '2025-04-12', ctr: 6.1 },
              ]}
              earningsData={[
                { date: '2025-04-10', amount: 120 },
                { date: '2025-04-11', amount: 80 },
                { date: '2025-04-12', amount: 150 },
              ]}
            />
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="bg-white p-6 rounded-lg shadow w-full mt-10">
            <h2 className="text-xl font-bold">Integrations</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <IntegrationCard
                title="Zapier"
                description="Automate your workflow by connecting with 6,000+ apps via Zapier."
                status="Coming Soon"
              />
              <IntegrationCard
                title="CRM Tools"
                description="Sync leads directly to your CRM like HubSpot, Salesforce, or Pipedrive."
                status="Coming Soon"
              />
              <GA4Toggle />
              <IntegrationCard
                title="UTM Tracking"
                description="Track source, medium, and campaign for every lead submission."
                status="Built-In"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border rounded-lg shadow px-4 py-5 flex flex-col gap-2">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-bold text-gray-800">{value}</p>
    </div>
  );
}