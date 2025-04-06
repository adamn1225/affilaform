export async function fetchAffiliates(baseUrl: string, token: string) {
    const res = await fetch(`${baseUrl}/api/vendor/leads`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch affiliates');
    }
  
    return res.json();
  }
  
  export async function fetchLeads(baseUrl: string, token: string) {
    const res = await fetch(`${baseUrl}/api/my-leads`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch leads');
    }
  
    return res.json();
  }