import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const res = NextResponse.json({ success: true });
        res.cookies.set('token', '', {
            path: '/',
            expires: new Date(0), // Expire the cookie
        });
        return res;
    } catch (err) {
        console.error('Logout error:', err);
        return NextResponse.json({ error: 'Failed to log out' }, { status: 500 });
    }
}