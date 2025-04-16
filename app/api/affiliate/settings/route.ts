import { NextRequest, NextResponse } from 'next/server';
import { apiFetch } from '@/lib/api/apiFetch';

export async function GET(req: NextRequest) {
    try {
        const res = await apiFetch('/api/affiliate/settings');
        return NextResponse.json(res);
    } catch (err) {
        console.error('[GET /api/affiliate/settings]', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}