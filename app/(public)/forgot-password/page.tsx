'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<'vendor' | 'affiliate'>('vendor');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, role }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Failed to send reset link');
            toast.success('Password reset link sent!');
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow border border-gray-200">
            <h1 className="text-xl font-semibold mb-4">Forgot Password</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full border px-3 py-2 rounded focus:ring focus:ring-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <select
                        className="w-full border px-3 py-2 rounded"
                        value={role}
                        onChange={(e) => setRole(e.target.value as 'vendor' | 'affiliate')}
                    >
                        <option value="vendor">Vendor</option>
                        <option value="affiliate">Affiliate</option>
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>
        </div>
    );
}
