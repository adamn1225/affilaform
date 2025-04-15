import { apiFetch } from "./apiFetch";

export type AffiliateCommission = {
  ID: number;
  AffiliateID: number;
  Commission: number;
  CreatedAt: string;
};



export async function updateAffiliateProfile(profileData: {
  company_name: string;
  contact_name: string;
  phone: string;
  website: string;
  industry: string;
}): Promise<void> {
  try {
    // Call apiFetch and handle the response
    await apiFetch('/api/affiliate/profile', {
      method: 'PATCH',
      body: JSON.stringify(profileData),
    });

    // No need to parse the response here since apiFetch already handles it
  } catch (err) {
    console.error('[updateAffiliateProfile] Error:', err);
    throw err;
  }
}




export async function updateAffiliateCommission(commission: number) {
  const res = await apiFetch("/api/affiliate/commissions");
  if (res && typeof res === "object" && "Commission" in res) {
    return res as AffiliateCommission;
  } else {
    console.warn("[updateAffiliateCommission] Invalid response structure:", res);
    return null;
  }
}

export type AffiliateWallet = {
  ID: number;
  AffiliateID: number;
  Balance: number;
  UpdatedAt: string;
};

export async function getAffiliateWallet(): Promise<AffiliateWallet | null> {
  try {
    const res = await apiFetch("/api/affiliate/wallet");
    console.log("[getAffiliateWallet] Response:", res); // Debug log

    if (res && typeof res === "object" && "Balance" in res) {
      return res as AffiliateWallet; // Directly cast the response to the AffiliateWallet type
    } else {
      console.warn("[getAffiliateWallet] Invalid response structure:", res);
      return null;
    }
  } catch (err) {
    console.error("[getAffiliateWallet] Failed to fetch:", err);
    return null;
  }
}

export type AffiliatePayout = {
  ID: number;
  AffiliateID: number;
  LeadID: number;
  Amount: number;
  AffiliateCut: number;
  PlatformFee: number;
  PaidAt?: string | null;
  Status: string;
  CreatedAt: string;
};

export async function getAffiliatePayouts(): Promise<AffiliatePayout[]> {
  try {
    const res = await apiFetch(`/api/affiliate/payouts`);
    console.log("[getAffiliatePayouts] Raw Response:", res);

    if (res && typeof res === "object" && "payouts" in res && Array.isArray(res.payouts)) {
      return res.payouts as AffiliatePayout[];
    } else {
      console.warn("[getAffiliatePayouts] Invalid response structure:", res);
      return [];
    }
  } catch (err) {
    console.error("[getAffiliatePayouts] Failed to fetch:", err);
    return [];
  }
}

export async function getAffiliateCommission(): Promise<AffiliateCommission | null> {
  try {
    const res = await apiFetch("/api/affiliate/commissions"); // ← fix here
    console.log("[getAffiliateCommission] Response:", res);

    if (res && typeof res === "object" && "Commission" in res) {
      return res as AffiliateCommission;
    } else {
      console.warn("[getAffiliateCommission] Invalid response structure:", res);
      return null;
    }
  } catch (err) {
    console.error("[getAffiliateCommission] Failed to fetch:", err);
    return null;
  }
}

