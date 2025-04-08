import jwt from 'jsonwebtoken';

export function generateServerToken(): string {
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET;

    if (!secret) {
        throw new Error('JWT secret is not defined in the environment variables');
    }

    // Generate a token with the required claims
    const token = jwt.sign(
        {
            user_id: '1',
            role: 'vendor',
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
    );

    return token;
}