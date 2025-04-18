// app/affiliate/rotators/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getMyRotators, OfferRotator } from '@/lib/api/rotators';

export default function AffiliateRotatorsPage() {
    const [rotators, setRotators] = useState<OfferRotator[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRotators = async () => {
            try {
                const rotators = await getMyRotators();
                setRotators(rotators || []);
                console.log('Rotators from API:', rotators);
                if (rotators.length === 0) {
                    console.warn('No rotators returned. Injecting mock for debug.');
                    setRotators([
                        {
                            ID: 99,
                            AffiliateID: 1,
                            Name: 'Mock Rotator',
                            Slug: 'mock123',
                            Strategy: 'random',
                            CreatedAt: new Date().toISOString(),
                        }
                    ]);
                }

            } catch (err) {
                console.error('Failed to fetch rotators:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchRotators();
    }, []);

    return (
        <div className="max-w-3xl mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Your Rotators</h1>
                <Link
                    href="/affiliate/rotators/new"
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                    + New Rotator
                </Link>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : rotators.length === 0 ? (
                <p className="text-gray-500">You haven’t created any rotators yet.</p>
            ) : (
                <ul className="space-y-4">
                    {rotators.map((rotator) => (
                        <li key={rotator.ID} className="border p-4 rounded shadow-sm bg-white">
                            <div className="flex justify-between items-center">
                                <div>
                                    <Link
                                        href={`/affiliate/rotators/${rotator.ID}`}
                                        className="text-lg font-semibold text-blue-600 hover:underline"
                                    >
                                        {rotator.Name}
                                    </Link>
                                    <p className="text-sm text-gray-500">
                                        Slug: <code>{rotator.Slug}</code> | Strategy: {rotator.Strategy}
                                    </p>
                                </div>
                                <Link
                                    href={`/affiliate/rotators/${rotator.ID}`}
                                    className="text-sm text-blue-500 hover:underline"
                                >
                                    View →
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>

            )}
        </div>
    );
}
