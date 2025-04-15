// app/affiliate/rotators/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiFetch } from '@/lib/api/apiFetch';
import toast from 'react-hot-toast';
import { GetRotatorByID, RotatorDetailResponse, addRotatorLink, deleteRotatorLink, updateRotatorLinkWeight, OfferRotator, RotatorLink } from '@/lib/api/rotators';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { ClipboardCopyIcon, Trash2Icon } from 'lucide-react';

export default function RotatorDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [rotator, setRotator] = useState<RotatorDetailResponse['rotator'] | null>(null);
  const [links, setLinks] = useState<RotatorDetailResponse['links']>([]);
  const [savingLinkId, setSavingLinkId] = useState<number | null>(null);
  const [newUrl, setNewUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [updatedName, setUpdatedName] = useState('');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

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
    };
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
      const res = await addRotatorLink(Number(id), newUrl, 1);
      if (!res) throw new Error('Failed to add link');
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

  const deleteLink = async (linkId: number) => {
    try {
      await deleteRotatorLink(Number(id), linkId);
      setLinks(prev => prev.filter(l => l.ID !== linkId));
      toast.success('Link deleted');
    } catch (err) {
      toast.error('Failed to delete link');
    }
  };

  const sortedLinks = [...links].sort((a, b) => b.Clicks - a.Clicks);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex gap-6 max-w-8xl mx-auto py-8">
      <div className='bg-white border rounded-lg shadow p-6'>
        <h1 className="text-2xl font-bold mb-4">Rotator Details</h1>
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
            {sortedLinks.map((link) => (
              <li key={link.ID} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-gray-50 p-3 rounded border">
                <div>
                  <span className="text-blue-600 underline break-all">{link.URL}</span>
                  <p className="text-sm text-gray-500">{link.Clicks} clicks</p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-700">Weight</label>
                  <input
                    type="number"
                    min={1}
                    value={link.Weight}
                    onChange={(e) => {
                      const newWeight = parseInt(e.target.value);
                      if (isNaN(newWeight) || newWeight < 1) return;
                      setLinks(prev => prev.map(l => l.ID === link.ID ? { ...l, Weight: newWeight } : l));
                    }}
                    onBlur={async () => {
                      setSavingLinkId(link.ID);
                      try {
                        const updated = await updateRotatorLinkWeight(Number(id), link.ID, link.Weight);
                        setLinks(prev => prev.map(l => l.ID === link.ID ? { ...l, Weight: updated.Weight } : l));
                        toast.success('Weight updated');
                      } catch {
                        toast.error('Failed to update weight');
                      } finally {
                        setSavingLinkId(null);
                      }
                    }}
                    disabled={savingLinkId === link.ID}
                    className="w-16 border rounded px-2 py-1 text-sm"
                  />
                  <button onClick={() => deleteLink(link.ID)} className="text-red-500 hover:text-red-700" title="Delete">
                    <Trash2Icon size={16} />
                  </button>
                </div>
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

        <div className="mt-8 space-y-4">
          <h2 className="text-md font-semibold">Embed Redirect URLs</h2>
          {[`/r/preview/${rotator?.Slug}`, `/r/preview/${rotator?.Slug}`].map((path, i) => (
            <div key={i} className="flex items-center bg-gray-100 px-3 py-2 rounded">
              <code className="flex-1 text-sm select-all">
                {`${window.location.origin}${path}`}
              </code>
              <button
                onClick={() => copyToClipboard(`${window.location.origin}${path}`)}
                className="ml-2 text-gray-600 hover:text-black"
                title="Copy"
              >
                <ClipboardCopyIcon size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-8 w-full'>
        {sortedLinks.length > 0 && (
          <div className="bg-white border rounded-lg shadow p-4 mb-6">
            <h3 className="text-md font-semibold mb-2">Click Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={sortedLinks}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="URL"
                  tickFormatter={(url) => {
                    const cleaned = url.replace(/^https?:\/\//, '');
                    return cleaned.length > 20 ? cleaned.slice(0, 20) + '...' : cleaned;
                  }}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Clicks" fill="#1e3a8a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
