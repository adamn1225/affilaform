export async function fetchVendorProfile() {
    const res = await fetch('/api/me');
  
    if (!res.ok) {
      throw new Error('Failed to fetch vendor profile');
    }
  
    return res.json();
  }