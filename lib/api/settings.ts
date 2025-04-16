import { apiFetch } from "./apiFetch";

export async function updateAffiliateSettings(settings: { ga4_enabled?: boolean; zapier_webhook_url?: string }) {
    return await apiFetch('/api/affiliate/settings', {
        method: 'PATCH',
        body: JSON.stringify(settings),
    });
}

export async function updateGA4Tracking(enable: boolean): Promise<void> {
    try {
        await apiFetch('/api/affiliate/tracking', {
            method: 'PATCH',
            body: JSON.stringify({ enable_ga4: enable }),
        });
    } catch (err) {
        console.error('[updateGA4Tracking] Error:', err);
        throw err;
    }
}