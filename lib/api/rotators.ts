import { apiFetch } from './apiFetch'

export type OfferRotator = {
    ID: number
    AffiliateID: string
    Name: string
    Slug: string
    Strategy: string
    CreatedAt: string
}

export async function getMyRotators(): Promise<OfferRotator[]> {
    try {
        const res = await apiFetch('/api/affiliate/rotators');
        if (!Array.isArray(res)) {
            console.error('[getMyRotators] Expected an array, got:', res);
            return [];
        }
        return res; // ← direct return of array
    } catch (error) {
        console.error('[getMyRotators] Failed to fetch:', error);
        return [];
    }
}


export async function createRotator(name: string): Promise<OfferRotator | null> {
    try {
        const res = await apiFetch('/api/affiliate/rotators', {
            method: 'POST',
            body: JSON.stringify({ name }),
        })

        if (!res || typeof res !== 'object') {
            console.error('[createRotator] Invalid response:', res)
            return null
        }

        return res.rotator || null // Assuming your backend returns `{ rotator: {...} }`
    } catch (error) {
        console.error('[createRotator] Failed to create rotator:', error)
        return null
    }
}

export type RotatorLink = {
    ID: number;
    RotatorID: number;
    URL: string;
    Weight: number;
    Clicks: number;
    CreatedAt: string;
};

export type RotatorDetailResponse = {
    rotator: OfferRotator;
    links: RotatorLink[];
};

export async function GetRotatorByID(rotatorId: number): Promise<RotatorDetailResponse | null> {
    try {
        const res = await apiFetch(`/api/affiliate/rotators/${rotatorId}`);

        if (!res || typeof res !== 'object' || !res.rotator) {
            console.error('[GetRotatorByID] Invalid response:', res);
            return null;
        }

        return {
            rotator: {
                ID: res.rotator.ID as number,
                Name: res.rotator.Name as string,
                Slug: res.rotator.Slug as string,
                Strategy: res.rotator.Strategy as string,
                AffiliateID: res.rotator.AffiliateID as string,
                CreatedAt: res.rotator.CreatedAt as string,
            },
            links: (res.links || []).map((link: any): RotatorLink => ({
                ID: link.ID as number,
                URL: link.URL as string,
                Weight: link.Weight as number,
                Clicks: link.Clicks as number,
                CreatedAt: link.CreatedAt as string,
                RotatorID: link.RotatorID as number,
            })),
        };
    } catch (error) {
        console.error('[GetRotatorByID] Failed to fetch rotator:', error);
        return null;
    }
}


export async function addRotatorLink(rotatorId: number, url: string, weight: number): Promise<RotatorLink | null> {
    try {
        const res = await apiFetch(`/api/affiliate/rotators/${rotatorId}/links`, {
            method: 'POST',
            body: JSON.stringify({ url, weight }),
            credentials: 'include',
        });

        // Directly return the response if it matches the expected structure
        if (
            res &&
            typeof res === 'object' &&
            'ID' in res &&
            'RotatorID' in res &&
            'URL' in res &&
            'Weight' in res
        ) {
            return res as RotatorLink;
        }

        console.error('[addRotatorLink] Invalid response:', res);
        return null;
    } catch (error) {
        console.error('[addRotatorLink] Failed to add link:', error);
        return null;
    }
}

export async function getRotatorLinks(rotatorId: number): Promise<RotatorLink[]> {
    try {
        const res = await fetch(`/api/affiliate/rotator/link?rotator_id=${rotatorId}`)

        if (!Array.isArray(res)) {
            console.error('[getRotatorLinks] Expected an array, got:', res)
            return []
        }

        return res // ← direct return of array
    } catch (error) {
        console.error('[getRotatorLinks] Failed to fetch:', error)
        return []
    }
}

export type RotatorClickSummary = {
    rotator_id: number;
    name: string;
    clicks: number;
  };
  
  export async function getRotatorClickSummary(): Promise<RotatorClickSummary[]> {
    const res = await apiFetch('/api/affiliate/rotators/clicks-summary');
    if (!res.ok) throw new Error('Failed to fetch click summary');
    return res.json();
}