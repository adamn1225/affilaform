'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const isValid = password.length >= 8 && password === confirmPassword;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid || !token) return;

        setSubmitting(true);
        try {
            const res = await fetch('/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Reset failed');

            toast.success('Password reset successful!');
            window.location.href = '/login';
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (!token) {
        return (
            <div className="max-w-md mx-auto mt-20 text-center">
                <h2 className="text-lg font-semibold">Invalid or missing token</h2>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white border rounded-xl shadow">
            <h1 className="text-xl font-semibold mb-4">Reset Password</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">New Password</label>
                    <input
                        type="password"
                        className="w-full border px-3 py-2 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Confirm Password</label>
                    <input
                        type="password"
                        className="w-full border px-3 py-2 rounded"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={!isValid || submitting}
                    className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                >
                    {submitting ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
}
