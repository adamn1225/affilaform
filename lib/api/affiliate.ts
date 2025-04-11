import { apiFetch } from "./apiFetch";

export type AffiliateCommission = {
  ID: number;
  AffiliateID: string;
  Commission: number;
  CreatedAt: string;
};

export type AffiliatePayout = {
  ID: number;
  AffiliateID: string;
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_LOCAL}/api/affiliate/payouts`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1")}`,
      },
    });

    if (!res.ok) {
      console.error('[getAffiliatePayouts] Failed:', await res.json());
      return [];
    }

    const data = await res.json();
    console.log('[getAffiliatePayouts] Response:', data);
    return data.payouts;
  } catch (err) {
    console.error('[getAffiliatePayouts] Error:', err);
    return [];
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
  AffiliateID: string;
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

