'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signup } from '@/lib/api/auth';

type Role = 'vendor' | 'affiliate';

interface SignupFormProps {
  role: Role;
}

export default function SignupForm({ role }: SignupFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const data = await signup({ email, password, company_name: company, role });
      console.log('Signup successful:', data); // Use the data for debugging or additional logic
      window.location.href = `/dashboard/${role}`
    } catch (err: any) {
      setError(err.message);
    }
  };



  return (
    <div className="max-w-lg mx-auto mt-16 p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h1 className="text-3xl font-semibold text-center mb-6 capitalize">{role} Signup</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Awesome Inc."
            required
          />
        </div>
        <div className="flex items-center gap-1 text-center mt-4">
          <input
            type="checkbox"
            className="border p-2 w-4 h-4"
          />
          <p className="text-sm text-gray-600">
            By logging in, you agree to our{' '}
            <a href="/terms" className="text-blue-500 hover:underline">
              Terms of Service
            </a>{' '} and{' '}
            <a href="/privacy" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
        <div className="text-center mt-4">
          {/* //subscribe */}
          <p className="flex gap-2 text-sm text-gray-600">

            <input
              type='checkbox'
              className="border p-2 w-4 h-4"
            />
            <label className="text-sm text-gray-600">
              Subscribe and get updates on new features, offers, and more. </label>
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-all"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}