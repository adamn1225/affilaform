// app/api/affiliate/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();

    const res = await fetch('http://localhost:8080/api/affiliate/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        let message = 'Signup failed';
        try {
            const errJson = await res.json();
            message = errJson.error || message;
        } catch (e) {
            console.error('[signup route] Failed to parse backend error JSON');
        }
        return NextResponse.json({ error: message }, { status: res.status });
    }

    const result = await res.json();
    const response = NextResponse.json(result);
    response.cookies.set('token', result.token, {
        httpOnly: false,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });

    return response;
}
