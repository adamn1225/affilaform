import { apiFetch } from './apiFetch'

export type OfferRotator = {
    ID: number
    AffiliateID: number
    Name: string
    Slug: string
    Strategy: string
    CreatedAt: string
}

export async function getMyRotators(): Promise<OfferRotator[]> {
    try {
        const res = await apiFetch('/api/affiliate/rotators');
        console.log('[getMyRotators] Response:', res); // Debug log
        if (!Array.isArray(res)) {
            console.error('[getMyRotators] Expected an array, got:', res);
            return [];
        }
        return res;
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
            credentials: 'include',
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
    ID: number
    RotatorID: number
    URL: string
    Weight: number
    Clicks: number
    CreatedAt: string
    Conditions?: any
    Strategy?: string
}

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
            rotator: res.rotator,
            links: res.links || [],
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

export async function getRotatorPreview(slug: string): Promise<{ url: string; name: string; strategy: string } | null> {
    try {
        const res = await apiFetch(`/api/public/rotators/${slug}`);

        if (!res || typeof res !== 'object' || !res.rotator || !Array.isArray(res.links)) {
            console.error('[getRotatorPreview] Invalid response:', res);
            return null;
        }

        // Extract the first link's URL (or apply your selection logic)
        const firstLink = res.links[0];
        if (!firstLink || !firstLink.URL) {
            console.error('[getRotatorPreview] No valid links found:', res.links);
            return null;
        }

        return {
            url: firstLink.URL as string,
            name: res.rotator.Name as string,
            strategy: res.rotator.Strategy as string,
        };
    } catch (error) {
        console.error('[getRotatorPreview] Failed to fetch rotator preview:', error);
        return null;
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

export async function deleteRotatorLink(rotatorId: number, linkId: number): Promise<boolean> {
    try {
        await apiFetch(`/api/affiliate/rotators/${rotatorId}/links/${linkId}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        return true; // Indicates success
    } catch (error) {
        console.error('[deleteRotatorLink] Failed to delete link:', error);
        return false; // Indicates failure without throwing
    }
}

export async function updateRotatorLinkWeight(rotatorId: number, linkId: number, weight: number): Promise<{ Weight: number }> {
    try {
        const res = await apiFetch(`/api/affiliate/rotators/${rotatorId}/links/${linkId}`, {
            method: 'PATCH',
            body: JSON.stringify({ weight }),
            credentials: 'include',
        });
        return res; // Return the updated link data
    } catch (error) {
        console.error('[updateRotatorLinkWeight] Failed to update weight:', error);
        throw error; // Propagate the error to the caller
    }
}