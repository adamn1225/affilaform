'use client';

import { useAffiliateSettings } from '@/lib/hooks/useAffiliateSettings';
import { useState } from 'react';
import { updateAffiliateSettings } from '@/lib/api/settings';
import toast from 'react-hot-toast';

export default function ZapierCard() {
    const { settings, loading, error, refetch } = useAffiliateSettings();
    const [zapierUrl, setZapierUrl] = useState(settings?.zapier_url || '');
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        try {
            setSaving(true);
            await updateAffiliateSettings({ zapier_webhook_url: zapierUrl });
            toast.success('Zapier URL updated successfully');
            refetch();
        } catch (err) {
            toast.error('Failed to update Zapier URL');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error || !settings) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-2">Zapier Integration</h2>
            <p className="text-sm text-gray-600 mb-4">
                Automate your workflow by connecting with Zapier.
            </p>
            <input
                type="text"
                className="w-full border px-3 py-2 rounded mb-4"
                value={zapierUrl}
                onChange={(e) => setZapierUrl(e.target.value)}
                placeholder="Enter Zapier Webhook URL"
            />
            <button
                onClick={handleSave}
                disabled={saving}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
                {saving ? 'Saving...' : 'Save'}
            </button>
        </div>
    );
}