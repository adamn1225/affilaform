'use client';
import React, { useState, useEffect } from 'react';
import LoginForm from '@/components/forms/LoginForm';
import AffLoginForm from '@/components/forms/AffLoginForm';

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState<'vendor' | 'affiliate'>('vendor');

    return (
        <div className="max-w-lg mx-auto mt-10">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => setActiveTab('vendor')}
                    className={`px-4 py-2 text-sm font-medium ${
                        activeTab === 'vendor' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
                    } rounded-l`}
                >
                    Vendor Login
                </button>
                <button
                    onClick={() => setActiveTab('affiliate')}
                    className={`px-4 py-2 text-sm font-medium ${
                        activeTab === 'affiliate' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
                    } rounded-r`}
                >
                    Affiliate Login
                </button>
            </div>

            {/* Render the Active Form */}
            <div className=" rounded shadow-sm p-4 border border-gray-300">
                {activeTab === 'vendor' ? <LoginForm /> : <AffLoginForm />}
            </div>
        </div>
    );
}