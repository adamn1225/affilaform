'use client';
import { useEffect, useState } from 'react';
import { getRotatorClickSummary, RotatorClickSummary } from '@/lib/api/rotators';

export default function RotatorClickWidget() {
  const [data, setData] = useState<RotatorClickSummary[]>([]);

  useEffect(() => {
    getRotatorClickSummary()
      .then(setData)
      .catch(() => console.error('Failed to load click summary'));
  }, []);

  if (!data || data.length === 0) return null;

  const totalClicks = data.reduce((sum, r) => sum + r.clicks, 0);

  return (
    <div className="bg-white border border-gray-300 shadow p-6 rounded-lg mt-12">
      <h2 className="text-lg font-semibold mb-2">Your Rotator Clicks</h2>
      <p className="text-sm text-gray-600 mb-4">
        Total Clicks: <span className="font-semibold">{totalClicks}</span>
      </p>
      <ul className="text-sm divide-y">
        {data.map((r) => (
          <li key={r.rotator_id} className="py-2 flex justify-between">
            <span>{r.name}</span>
            <span className="font-medium">{r.clicks}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
