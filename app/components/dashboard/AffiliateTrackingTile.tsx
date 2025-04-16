'use client';

import { useState } from 'react';
import { updateAffiliateSettings } from '@/lib/api/settings';

export default function AffiliateTrackingTile() {
    const [ga4Enabled, setGa4Enabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleGA4 = async () => {
        setLoading(true);
        try {
            const updated = await updateAffiliateSettings({ ga4_enabled: !ga4Enabled });
            setGa4Enabled(!ga4Enabled);
        } catch (err) {
            console.error('Failed to toggle GA4:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white border rounded-lg shadow p-4 flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Tracking Integrations</h3>
            <div className="flex items-center justify-between">
                <p className="text-sm">Google Analytics 4 (GA4) Tracking</p>
                <label className="flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only"
                        checked={ga4Enabled}
                        onChange={toggleGA4}
                        disabled={loading}
                    />
                    <div className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${ga4Enabled ? 'bg-green-400' : 'bg-gray-300'}`}>
                        <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${ga4Enabled ? 'translate-x-5' : ''}`}
                        />
                    </div>
                </label>
            </div>
        </div>
    );
}
