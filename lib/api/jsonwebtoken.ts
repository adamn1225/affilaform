import { SignJWT } from 'jose';

export async function generateServerToken(userId: number = 1, role: 'affiliate' | 'vendor' | 'admin' = 'affiliate'): Promise<string> {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

    return await new SignJWT({ user_id: userId, role })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('24h')
        .sign(secret);
}
