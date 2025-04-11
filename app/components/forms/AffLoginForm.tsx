'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface LoginFormProps {
    role: 'affiliate'
}

export default function AffLoginForm({ role }: LoginFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleLogin = async (email: string, password: string) => {
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

            if (data.redirectTo) {
                window.location.href = data.redirectTo; // Redirect to the onboarding page
            }
        } catch (err) {
            console.error(err);
            toast.error('Login failed');
        }
    };


    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleLogin(email, password);
        }} className="border p-4 rounded shadow-sm space-y-4 max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold capitalize">{role} Login</h1>
            {error && <p className="text-red-600">{error}</p>}
            <input
                className="border p-2 w-full"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                className="border p-2 w-full"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <div className='flex justify-center w-full'>
                <button type="submit" className="bg-black w-1/3 text-white px-4 py-2">Log In</button>
            </div>
            <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                    Forgot your password?{' '}
                    <a href={`/${role}/reset-password`} className="text-blue-500 hover:underline">
                        Reset Password
                    </a>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                    Don't have an account?{' '}
                    <a href={`/${role}/signup`} className="text-blue-500 hover:underline">
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


        </form>
    )
}
