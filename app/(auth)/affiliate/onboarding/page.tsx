'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { updateAffiliateProfile } from '@/lib/api/affiliate';

const INDUSTRY_OPTIONS = [
    'Construction', 'Transportation', 'Healthcare',
    'Education', 'Technology', 'Finance',
    'Real Estate', 'Retail', 'Marketing',
];

export default function AffiliateOnboardingPage() {
    const [companyName, setCompanyName] = useState('');
    const [contactName, setContactName] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [industry, setIndustry] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [profileUpdated, setProfileUpdated] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await updateAffiliateProfile({
                company_name: companyName,
                contact_name: contactName,
                phone,
                website,
                industry,
            });

            toast.success('Profile updated!');
            router.push('/affiliate/dashboard');
        } catch (err) {
            console.error(err);
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (profileUpdated) {
            router.push('/affiliate/dashboard');
        }
    }, [profileUpdated, router]);

    return (
        <div className="max-w-lg mx-auto py-10 space-y-6">
            <h1 className="text-2xl font-bold mb-4">Complete Your Profile</h1>

            <input
                className="w-full p-2 border rounded"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
            />
            <input
                className="w-full p-2 border rounded"
                placeholder="Contact Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
            />
            <input
                className="w-full p-2 border rounded"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input
                className="w-full p-2 border rounded"
                placeholder="Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
            />

            <select
                className="w-full p-2 border rounded"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
            >
                <option value="">Select Industry</option>
                {INDUSTRY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>

            <button
                className="bg-black text-white py-2 px-6 rounded disabled:opacity-50"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? 'Submitting...' : 'Submit'}
            </button>
        </div>
    );
}