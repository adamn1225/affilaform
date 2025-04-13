import { apiFetch } from "./apiFetch";

export async function fetchVendorProfile(): Promise<VendorProfile> {
  const res = await apiFetch('/api/me');
  console.log('[fetchVendorProfile] Response:', res);

  if (!res.ok) {
      const errorText = await res.text(); // Read the error response
      console.error('[fetchVendorProfile] Error Response:', errorText);
      throw new Error('Failed to fetch vendor profile');
  }

  const data = await res.json(); // Parse the JSON response
  console.log('[fetchVendorProfile] Parsed Data:', data);
  return data as VendorProfile; // Cast the parsed data to VendorProfile
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
      credentials: 'include',
  });

  // If the response is already parsed, check for the "ok" property or handle it directly
  if (res.ok === false) {
      throw new Error(`Failed to update vendor profile: ${res.error || 'Unknown error'}`);
  }

  console.log('[updateVendorProfile] Response Data:', res);

  return {
      ok: true,
      ...res, // Include any additional fields from the backend response
  };
}