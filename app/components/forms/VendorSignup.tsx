'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeClosed, Eye } from 'lucide-react';

type Role = 'vendor';

interface SignupFormProps {
    role: Role;
}

export default function VendorSignup({ role }: SignupFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordValid, setPasswordValid] = useState(true);
    const router = useRouter();

    const validatePassword = (pwd: string) => {
        const isValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(pwd);
        setPasswordValid(isValid);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password does not meet complexity requirements.');
            return;
        }

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, company_name: company, role }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Signup failed');
            }

            router.push('/login');
        }
        catch (err: any) {
            setError(err.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-16 p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
            <h1 className="text-3xl font-semibold text-center mb-6 capitalize">{role} Signup</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                {/* Email Input */}
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

                {/* Password Input with Eye Toggle */}
                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <div className="relative">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validatePassword(e.target.value);
                            }}
                            placeholder="••••••••"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute right-3 top-2 text-gray-500 hover:text-black"
                            title={passwordVisible ? 'Hide password' : 'Show password'}
                        >
                            {passwordVisible ? <EyeClosed size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {!passwordValid && (
                        <p className="text-sm text-red-600">
                            Password must be at least 8 characters, include a capital letter, number, and special character.
                        </p>
                    )}
                </div>

                {/* Confirm Password Input */}
                <div>
                    <label className="block text-sm font-medium mb-1">Confirm Password</label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                </div>

                {/* Company Name Input */}
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

                {/* Terms and Conditions */}
                <div className="flex items-center gap-1 text-center mt-4">
                    <input type="checkbox" className="border p-2 w-4 h-4" />
                    <p className="text-sm text-gray-600">
                        By logging in, you agree to our{' '}
                        <a href="/terms" className="text-blue-500 hover:underline">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="/privacy" className="text-blue-500 hover:underline">
                            Privacy Policy
                        </a>
                    </p>
                </div>

                {/* Subscribe Checkbox */}
                <div className="text-center mt-4">
                    <p className="flex gap-2 text-sm text-gray-600">
                        <input type="checkbox" className="border p-2 w-4 h-4" />
                        <label className="text-sm text-gray-600">
                            Subscribe and get updates on new features, offers, and more.
                        </label>
                    </p>
                </div>

                {/* Submit Button */}
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