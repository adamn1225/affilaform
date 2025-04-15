'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ResendConfirmationPage() {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<'vendor' | 'affiliate'>('affiliate');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch('/api/resend-confirmation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, role }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Failed to resend confirmation');

            toast.success('Confirmation email sent!');
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white border rounded-xl shadow">
            <h1 className="text-xl font-semibold mb-4 text-center">Resend Confirmation Email</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as 'vendor' | 'affiliate')}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="affiliate">Affiliate</option>
                        <option value="vendor">Vendor</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                >
                    {submitting ? 'Sending...' : 'Send Confirmation'}
                </button>
            </form>
        </div>
    );
}
