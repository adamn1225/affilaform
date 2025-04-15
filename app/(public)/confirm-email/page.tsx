'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ConfirmEmailPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const token = searchParams.get('token');

    useEffect(() => {
        const confirmEmail = async () => {
            if (!token) {
                toast.error('Missing token.');
                return;
            }

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_LOCAL}/confirm-email?token=${token}`);
                const data = await res.json();

                if (!res.ok) {
                    toast.error(data.error || 'Failed to confirm email');
                    return;
                }

                toast.success('Email confirmed!');
                router.push('/login');
            } catch (err) {
                toast.error('Something went wrong.');
            } finally {
                setLoading(false);
            }
        };

        confirmEmail();
    }, [token]);

    return (
        <div className="flex justify-center items-center h-screen">
            {loading ? (
                <p className="text-gray-700 text-lg">Confirming your email...</p>
            ) : (
                <p className="text-gray-600 text-lg">Redirecting to login...</p>
            )}
        </div>
    );
}
