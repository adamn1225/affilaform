import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();

    // Send login request to the backend server
    const res = await fetch('http://localhost:8080/api/vendor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const error = await res.json();
        return NextResponse.json({ error: error.error || 'Login failed' }, { status: res.status });
    }

    const { token, user } = await res.json();

    // Set the token as a cookie
    const response = NextResponse.json({
        user,
        token,
        redirectTo: '/vendor/dashboard',
    });

    response.cookies.set('token', token, {
        path: '/',
        httpOnly: true, // Use httpOnly for security
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });

    return response;
}