import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();

    const res = await fetch('http://localhost:8080/api/vendor/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
    });

    if (!res.ok) {
        const error = await res.json();
        return NextResponse.json({ error: error.error || 'Signup failed' }, { status: res.status });
    }

    const { token, user } = await res.json();

    const response = NextResponse.json({ user, token });

    response.cookies.set('token', token, {
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });

    return response;
}