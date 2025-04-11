'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { apiFetch } from '@/lib/api/apiFetch';

export default function CreateRotatorPage() {
    const [name, setName] = useState('');
    const [strategy, setStrategy] = useState('random');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!name.trim()) {
            toast.error('Please enter a name for the rotator');
            return;
        }
        setLoading(true);
        try {
            const res = await apiFetch('/api/affiliate/rotators', {
                method: 'POST',
                body: JSON.stringify({ name, strategy }),
            });
            toast.success('Rotator created!');
            router.push(`/affiliate/rotators/${res.rotator.id}`);
        } catch (err) {
            toast.error('Failed to create rotator');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md border mt-10">
            <h1 className="text-2xl font-bold mb-4">Create New Rotator</h1>
            <div className="space-y-4">
                <div>
                    <label className="block font-medium text-gray-700">Rotator Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Strategy</label>
                    <select
                        value={strategy}
                        onChange={(e) => setStrategy(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="random">Random</option>
                        <option value="sequential">Sequential</option>
                    </select>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
                >
                    {loading ? 'Creating...' : 'Create Rotator'}
                </button>
            </div>
        </div>
    );
}
