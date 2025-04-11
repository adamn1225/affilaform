// app/r/preview/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiFetch } from '@/lib/api/apiFetch';
import toast from 'react-hot-toast';

export default function RotatorPreviewPage() {
    const { slug } = useParams();
    const [rotator, setRotator] = useState<any>(null);
    const [links, setLinks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const fetchPreviewData = async () => {
            try {
                const res = await apiFetch(`/api/public/rotators/${slug}`); // Backend will expose this without auth
                setRotator(res.rotator);
                setLinks(res.links);
            } catch (err) {
                toast.error('Failed to load preview');
                console.error('[PreviewPage] Error fetching rotator:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPreviewData();
    }, [slug]);

    if (loading) return <p className="p-8 text-gray-500 text-center">Loading preview...</p>;

    if (!rotator) {
        return <p className="p-8 text-center text-red-500">Rotator not found or unavailable.</p>;
    }

    return (
        <div className="max-w-2xl mx-auto py-10 px-6">
            <h1 className="text-2xl font-bold mb-4">Preview: {rotator.name}</h1>
            <p className="text-sm text-gray-500 mb-2">
                Strategy: <strong>{rotator.strategy}</strong> | Slug: <code>{rotator.slug}</code>
            </p>

            <div className="mt-6 space-y-4">
                <h2 className="font-semibold text-lg">Destinations</h2>
                <ul className="list-disc pl-5">
                    {links.map((link: any) => (
                        <li key={link.ID} className="text-blue-600 underline">
                            <a href={link.URL} target="_blank" rel="noopener noreferrer">{link.URL}</a>
                            <span className="text-gray-500 text-sm ml-2">({link.clicks} clicks)</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
