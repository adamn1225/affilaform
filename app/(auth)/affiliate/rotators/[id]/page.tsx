// app/affiliate/rotators/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiFetch } from '@/lib/api/apiFetch';
import toast from 'react-hot-toast';
import { GetRotatorByID, RotatorDetailResponse, addRotatorLink, OfferRotator, RotatorLink } from '@/lib/api/rotators';

export default function RotatorDetailPage() {
    const router = useRouter();
    const { id } = useParams();
    const [rotator, setRotator] = useState<RotatorDetailResponse['rotator'] | null>(null);
    const [links, setLinks] = useState<RotatorDetailResponse['links']>([]);
    const [newUrl, setNewUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [editingName, setEditingName] = useState(false);
    const [updatedName, setUpdatedName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetRotatorByID(Number(id));
                if (!result) throw new Error('No rotator found');
                setRotator(result.rotator);
                setLinks(result.links);
                setUpdatedName(result.rotator.Name);
            } catch (err) {
                toast.error('Failed to load rotator');
                console.error('[RotatorDetailPage] Error:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
        return () => {
            setRotator(null);
            setLinks([]);
            setNewUrl('');
            setLoading(true);
            setEditingName(false);
            setUpdatedName('');
        };
    }, [id]);

    const addLink = async () => {
        if (!newUrl.trim()) return;

        try {
            const res = await addRotatorLink(Number(id), newUrl, 1); // Assuming a default weight of 1
            if (!res) throw new Error('Failed to add link');

            // Add the new link to the state
            setLinks([...links, res]);
            setNewUrl('');
            toast.success('Link added successfully');
        } catch (err) {
            console.error('[addLink] Error:', err);
            toast.error('Failed to add link');
        }
    };

    const updateName = async () => {
        try {
            const res = await apiFetch(`/api/affiliate/rotators/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ Name: updatedName })
            });
            setRotator(rotator ? { ...rotator, Name: res.Name } : null);
            setEditingName(false);
            toast.success('Rotator name updated');
        } catch (err) {
            toast.error('Failed to update name');
        }
    };

    const sortedLinks = [...links].sort((a, b) => b.Clicks - a.Clicks);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto py-8">
            <div className="flex justify-between items-center mb-4">
                {editingName ? (
                    <div className="flex gap-2 w-full">
                        <input
                            type="text"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                            className="flex-1 p-2 border rounded"
                        />
                        <button onClick={updateName} className="bg-black text-white px-3 py-1 rounded">Save</button>
                        <button onClick={() => setEditingName(false)} className="text-sm text-gray-500">Cancel</button>
                    </div>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold">Rotator: {rotator?.Name}</h1>
                        <button onClick={() => setEditingName(true)} className="text-sm text-blue-600 hover:underline">Edit</button>
                    </>
                )}
            </div>

            <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Slug: <code className="bg-gray-100 px-2 py-1 rounded">{rotator?.Slug}</code></p>
                <p className="text-sm text-gray-500">Strategy: <strong>{rotator?.Strategy}</strong></p>
            </div>

            <div className="space-y-4">
                <h2 className="font-semibold text-lg">Manage Links</h2>
                <ul className="list-disc pl-5 space-y-2">
                    {sortedLinks.map((links) => (
                        <li key={links?.ID} className="flex justify-between items-center">
                            <span className="text-blue-600 underline">{links?.URL}</span>
                            <span className="text-sm text-gray-500">({links?.Clicks} clicks)</span>
                        </li>
                    ))}
                </ul>

                <div className="flex gap-2 mt-4">
                    <input
                        type="url"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="flex-1 p-2 border rounded"
                    />
                    <button onClick={addLink} className="bg-black text-white px-4 py-2 rounded">
                        Add Link
                    </button>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-md font-semibold">Embed Redirect URL</h2>
                <code className="block bg-gray-100 p-2 rounded mt-1 select-all text-sm">
                    {rotator?.Slug
                        ? `${process.env.NEXT_PUBLIC_BASE_URL}/r/${rotator?.Slug}`
                        : 'Loading...'}
                </code>
                <code className="block bg-gray-100 p-2 rounded mt-1 select-all text-sm">
                    {rotator?.Slug
                        ? `${process.env.NEXT_PUBLIC_BASE_URL}/r/preview/${rotator?.Slug}`
                        : 'Loading...'}
                </code>
            </div>
        </div>
    );
}
