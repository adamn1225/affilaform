'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'vendor' | 'affiliate' | ''>(''); // Track selected role

  const joinWaitlist = async () => {
    if (!email.includes('@')) {
      toast.error('Enter a valid email');
      return;
    }

    if (!role) {
      toast.error('Please select whether you are a Vendor or an Affiliate');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        body: JSON.stringify({ email, role }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Something went wrong');
      }

      const data = await res.json();
      toast.success(data.message || 'You’re on the list!');
      setEmail('');
      setRole(''); // Reset role selection
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto py-20 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Be the First to Try AffilaForm</h1>
      <p className="text-gray-600 mb-6">
        AffilaForm is the ultimate tool for managing your affiliate marketing campaigns. Whether you're a Vendor looking to grow your business or an Affiliate seeking new opportunities, our platform has everything you need. Join the waitlist today and get early access to our powerful form builder, rotator links, and analytics dashboard.
      </p>
      <div className="flex items-center justify-center gap-2 mb-4">
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-4 py-2 w-full max-w-sm"
        />
        <button
          onClick={joinWaitlist}
          disabled={loading}
          className={`bg-black text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Joining...' : 'Join'}
        </button>
      </div>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setRole('vendor')}
          className={`px-4 py-2 rounded border ${
            role === 'vendor' ? 'bg-blue-500 text-white font-semibold' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Vendor
        </button>
        <button
          onClick={() => setRole('affiliate')}
          className={`px-4 py-2 rounded border ${
            role === 'affiliate' ? 'bg-emerald-600 text-white font-semibold' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Affiliate
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Not sure which one to choose? Vendors are businesses looking to promote their products, while Affiliates are marketers who help drive sales.
      </p>
    </main>
  );
}