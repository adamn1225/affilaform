import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { vendorId, email, message } = await req.json();

    console.log('Negotiate Request:', { vendorId, email, message });

    // TODO: Save to DB, send notification, etc.
    return NextResponse.json({ success: true });
}