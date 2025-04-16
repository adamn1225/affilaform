import React from 'react';

interface AffiliateIntegrationsProps {
    activeTab: 'payouts' | 'charts' | 'integrations';
    setActiveTab: (tab: 'payouts' | 'charts' | 'integrations') => void;
}

export default function AffiliateIntegrations({ activeTab, setActiveTab }: AffiliateIntegrationsProps) {
    const tabs: { id: 'payouts' | 'charts' | 'integrations'; label: string }[] = [
        { id: 'payouts', label: 'Payout Details' },
        { id: 'charts', label: 'Payout Metrics' },
        { id: 'integrations', label: 'Integrations' },
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow w-64">
            <h2 className="text-base font-bold mb-4">Dashboard Navigation</h2>
            <ul className="space-y-2">
                {tabs.map((tab) => (
                    <li key={tab.id}>
                        <button
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === tab.id
                                ? 'bg-gray-800 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {tab.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}