'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { apiFetch } from '@/lib/api/apiFetch';
import { motion, AnimatePresence } from 'framer-motion';


export default function UserSettings() {
    interface UserProfile {
        email: string;
        address: string;
        website: string;
        phone: string;
        first_name: string;
        last_name: string;
        company_name: string;
        industry: string;
        password?: string; // Optional password field
    }

    const [user, setUser] = useState<UserProfile>({
        email: '',
        address: '',
        website: '',
        phone: '',
        first_name: '',
        last_name: '',
        company_name: '',
        industry: '',
    });

    const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'notifications'>('profile');
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await apiFetch('/api/me');
                setUser({
                    email: res.email,
                    address: res.address || '',
                    website: res.website || '',
                    phone: res.phone || '',
                    first_name: res.first_name || '',
                    last_name: res.last_name || '',
                    company_name: res.company_name || '',
                    industry: res.industry || '',
                });
            } catch (err) {
                toast.error('Failed to fetch user profile');
            }
        };
        fetchUser();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (activeTab === 'password' && showPasswordFields && password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const payload = { ...user };
            if (activeTab === 'password' && showPasswordFields) {
                payload['password'] = password;
            }

            await apiFetch('/api/user/update', {
                method: 'PATCH',
                body: JSON.stringify(payload),
            });
            toast.success('Profile updated successfully');
        } catch (err) {
            toast.error('Failed to update profile');
        }
    };

    return (
        <div className="flex gap-4 max-w-6xl mx-auto p-6">
            {/* Tab Navigation */}
            <aside className="w-1/4 border-r pr-4">
                <h2 className="text-lg font-semibold mb-3">Settings</h2>
                <ul className="space-y-2 text-sm">
                    <li>
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`w-full text-left px-2 py-1 rounded-md ${activeTab === 'profile' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                        >
                            Profile
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab('password')}
                            className={`w-full text-left px-2 py-1 rounded-md ${activeTab === 'password' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                        >
                            Password
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab('notifications')}
                            className={`w-full text-left px-2 py-1 rounded-md ${activeTab === 'notifications' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                        >
                            Notifications
                        </button>
                    </li>
                </ul>
            </aside>

            {/* Main Form Area */}
            <div className="w-3/4 bg-white shadow-md rounded-md p-6">

                <form onSubmit={handleSubmit} className="space-y-6">
                    <h1 className="text-2xl font-bold mb-4 capitalize">{activeTab} Settings</h1>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'profile' && (
                                <>
                                    {/* Personal Info */}
                                    <section>
                                        <h2 className="text-lg font-semibold mb-3">Personal Info</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input label="Email" value={user.email} disabled />
                                            <Input label="Phone" value={user.phone} onChange={val => setUser({ ...user, phone: val })} />
                                            <Input label="First Name" value={user.first_name} onChange={val => setUser({ ...user, first_name: val })} />
                                            <Input label="Last Name" value={user.last_name} onChange={val => setUser({ ...user, last_name: val })} />
                                        </div>
                                    </section>

                                    {/* Company Info */}
                                    <section>
                                        <h2 className="text-lg font-semibold mt-6 mb-3">Company Info</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input label="Company Name" value={user.company_name} onChange={val => setUser({ ...user, company_name: val })} />
                                            <Input label="Industry" value={user.industry} onChange={val => setUser({ ...user, industry: val })} />
                                            <Input label="Website" value={user.website} onChange={val => setUser({ ...user, website: val })} fullWidth />
                                            <Input label="Address" value={user.address} onChange={val => setUser({ ...user, address: val })} fullWidth />
                                        </div>
                                    </section>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                    {/* Password Change */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'password' && (
                                <section>
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswordFields(!showPasswordFields)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {showPasswordFields ? 'Cancel Password Change' : 'Change Password'}
                                    </button>

                                    {showPasswordFields && (
                                        <div className="mt-4 grid grid-cols-2 gap-4">
                                            <Input label="New Password" type="password" value={password} onChange={setPassword} />
                                            <Input label="Confirm Password" type="password" value={confirmPassword} onChange={setConfirmPassword} />
                                        </div>
                                    )}
                                </section>
                            )}
                        </motion.div>
                    </AnimatePresence>
                    {/* Notifications */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'notifications' && (
                                <section>
                                    <p className="text-gray-600">Notifications settings coming soon.</p>
                                </section>
                            )}
                        </motion.div>
                    </AnimatePresence>
                    <div>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Reusable input component
function Input({ label, value, onChange, type = 'text', disabled = false, fullWidth = false }: {
    label: string;
    value: string;
    onChange?: (val: string) => void;
    type?: string;
    disabled?: boolean;
    fullWidth?: boolean;
}) {
    return (
        <div className={fullWidth ? 'col-span-2' : ''}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
                className={`w-full p-2 border border-gray-300 rounded-md ${disabled ? 'bg-gray-100' : ''}`}
            />
        </div>
    );
}
