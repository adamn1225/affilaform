import { apiFetch } from './apiFetch';

export type VendorCommission = {
    ID: number;
    VendorID: number;
    AffiliateID?: string | null;
    Commission: number;
    CreatedAt: string;
};

export async function getVendorCommission(): Promise<VendorCommission | null> {
    try {
        const res = await apiFetch('/api/vendor/commissions');
        console.log('[getVendorCommission] Response:', res); // Debug log

        // Validate and return the response
        if (res && typeof res === 'object' && 'Commission' in res) {
            return res as VendorCommission;
        } else {
            console.warn('[getVendorCommission] Invalid response structure:', res);
            return null;
        }
    } catch (err) {
        console.error('[getVendorCommission] Failed to fetch:', err);
        return null;
    }
}

export async function updateVendorCommission(commission: number) {
    return apiFetch('/api/vendor/commission', {
        method: 'PATCH',
        body: JSON.stringify({ commission }),
    })
}

export type Wallet = {
    ID?: number;
    VendorID?: number;
    balance?: number;
    UpdatedAt?: string;
};

export async function getVendorWallet(): Promise<Wallet | null> {
    try {
        const res = await apiFetch('/api/vendor/wallet');
        console.log('[getVendorWallet] Response:', res); // Debug log

        // Normalize the response structure
        if (res && typeof res === 'object' && 'Balance' in res) {
            const wallet: Wallet = {
                ID: res.ID ?? undefined,
                VendorID: res.VendorID ?? undefined,
                balance: res.Balance, // Map "Balance" to "balance"
                UpdatedAt: res.UpdatedAt ?? undefined,
            };
            console.log('[getVendorWallet] Parsed Wallet:', wallet); // Debug log
            return wallet;
        } else {
            console.warn('[getVendorWallet] Invalid response structure:', res);
            return null;
        }
    } catch (err) {
        console.error('[getVendorWallet] Failed to fetch:', err);
        return null;
    }
}

export type PublicVendor = {
    id: string;
    company_name: string;
    industry: string;
    website?: string;
    description?: string;
    commission?: number;
    public?: boolean;
};

export async function getAllVendors(): Promise<PublicVendor[]> {
    try {
        const res = await apiFetch('/api/public/vendors');
        console.log('[getAllVendors] Response:', res); // Debug log
        return res.vendors || [];
    } catch (err) {
        console.error('[getAllVendors] Failed to fetch vendors:', err);
        return [];
    }
}

export async function getVendorById(id: string): Promise<PublicVendor | null> {
    try {
        const res = await apiFetch(`/api/public/vendors/${id}`);
        if (res && res.id) return res as PublicVendor;
        return null;
    } catch (err) {
        console.error(`[getVendorById] Failed to fetch vendor ${id}:`, err);
        return null;
    }
}

export type VendorProfile = {
    CompanyName: string;
    FirstName: string;
    LastName: string;
    Phone: string;
    Website: string;
    Industry: string;
    Password: string;
    Address: string;
    Email: string,
};

interface UpdateVendorProfileResponse {
    ok: boolean;
    [key: string]: any; // Allow additional properties if needed
}

export async function updateVendorProfile(data: VendorProfile): Promise<UpdateVendorProfileResponse> {
    const res = await apiFetch('/api/vendor/profile', {
        method: 'PATCH',
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Failed to update vendor profile');
    }

    return res as UpdateVendorProfileResponse;
}