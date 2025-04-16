'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../api/apiFetch';

export type AffiliateSettings = {
    ga4_enabled: boolean;
    zapier_url?: string;
    webhook_url?: string;
    [key: string]: any;
};

export function useAffiliateSettings() {
    const [settings, setSettings] = useState<AffiliateSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSettings = async () => {
        try {
            const data = await apiFetch('/api/affiliate/settings');
            setSettings(data);
        } catch (err) {
            console.error('[useAffiliateSettings] Failed to fetch:', err);
            setError('Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    return {
        settings,
        loading,
        error,
        refetch: fetchSettings,
        setSettings,
    };
}
