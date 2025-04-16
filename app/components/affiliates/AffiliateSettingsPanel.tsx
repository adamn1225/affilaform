'use client';

import { useState, useEffect } from 'react';
import { updateAffiliateSettings } from '@/lib/api/settings';
import { useAffiliateSettings } from '@/lib/hooks/useAffiliateSettings';
import toast from 'react-hot-toast';

export default function AffiliateSettingsPanel() {
    const [activeTab, setActiveTab] = useState<'ga4' | 'zapier'>('ga4');
    const { settings, loading, refetch } = useAffiliateSettings();
    const [saving, setSaving] = useState(false);
    const [zapierInput, setZapierInput] = useState('');

    useEffect(() => {
        if (settings?.webhook_url) {
            setZapierInput(settings.webhook_url);
        }
    }, [settings?.webhook_url]);
    if (loading || !settings) {
        return <div className="text-center py-10 text-gray-500">Loading settings...</div>;
    }

    const handleGA4Toggle = async () => {
        try {
            setSaving(true);
            const newState = !settings.ga4_enabled;
            await updateAffiliateSettings({ ga4_enabled: newState });
            toast.success(`GA4 tracking ${newState ? 'enabled' : 'disabled'}`);
            refetch();
        } catch (err) {
            toast.error('Failed to update GA4 setting');
        } finally {
            setSaving(false);
        }
    };

    const handleZapierSave = async () => {
        try {
            setSaving(true);
            await updateAffiliateSettings({ zapier_webhook_url: zapierInput });
            toast.success('Zapier URL saved');
            refetch();
        } catch (err) {
            toast.error('Failed to update Zapier webhook');
        } finally {
            setSaving(false);
        }
    };


    return (
        <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto mt-10">
            <h2 className="text-xl font-bold mb-4">Affiliate Settings</h2>

            <div className="flex border-b mb-6">
                <button
                    className={`px-4 py-2 font-medium ${activeTab === 'ga4' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('ga4')}
                >
                    GA4 Tracking
                </button>
                <button
                    className={`ml-4 px-4 py-2 font-medium ${activeTab === 'zapier' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('zapier')}
                >
                    Zapier / CRM
                </button>
            </div>

            {activeTab === 'ga4' && (
                <div className="space-y-4">
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={settings.ga4_enabled}
                            onChange={handleGA4Toggle}
                            disabled={saving}
                            className="h-4 w-4"
                        />
                        <span>Enable Google Analytics 4 tracking</span>
                    </label>
                </div>
            )}

            {activeTab === 'zapier' && (
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">Zapier Webhook URL</label>
                    <input
                        type="url"
                        className="w-full border px-3 py-2 rounded"
                        value={zapierInput}
                        onChange={(e) => setZapierInput(e.target.value)}
                        placeholder="https://hooks.zapier.com/..."
                    />
                    <button
                        onClick={handleZapierSave}
                        disabled={saving}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Save Webhook
                    </button>
                </div>
            )}
        </div>
    );
}
