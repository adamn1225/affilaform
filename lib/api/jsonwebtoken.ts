import { SignJWT } from 'jose';

export async function generateServerToken(): Promise<string> {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

    return await new SignJWT({ user_id: 1, role: 'affiliate' })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('24h')
        .sign(secret);
}
