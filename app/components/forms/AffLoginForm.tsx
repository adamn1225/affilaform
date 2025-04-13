'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AffLoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/affil-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Redirect to the onboarding page
            if (data.redirectTo) {
                router.push(data.redirectTo);
            }
        } catch (err) {
            console.error(err);
            toast.error('Login failed');
        }
    };

    return (
<>
            <div className='p-4 max-w-md mx-auto mt-10'>
                <form onSubmit={handleLogin} className="space-y-4">
                    <h1 className="text-2xl font-bold">Affiliate Login</h1>
                    <input
                        className="border p-2 w-full"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="border p-2 w-full"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
      <div className='flex justify-center w-full'>
        <button type="submit" className="bg-black w-1/3 text-white px-4 py-2">Log In</button>
      </div>
                </form>
            <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Forgot your password?{' '}
              <a href={`/vendor/reset-password`} className="text-blue-500 hover:underline">
                Reset Password
              </a>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Don't have an account?{' '}
              <a href={`/affiliate/signup`} className="text-blue-500 hover:underline">
                Sign Up
              </a>
            </p>
    
          </div>
          <div className="text-center flex gap-1 items-center justify-center mt-4">
            <label className="text-sm text-gray-600">
            </label>
            <input
              type="checkbox"
              className="border p-2 w-4 h-4"
            />
            Remember Me
          </div>
            </div>
</>
    );
}