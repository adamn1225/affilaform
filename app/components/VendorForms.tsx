'use client';

import { useEffect, useState } from 'react';
import { getMyForms, FormConfig } from '@/lib/api/forms';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function VendorForms() {
  const [forms, setForms] = useState<FormConfig[]>([]);
  const [filteredForms, setFilteredForms] = useState<FormConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchForms() {
      try {
        const forms = await getMyForms();
        console.log('Fetched forms:', forms); // Log the entire forms array
        setForms(forms);
        setFilteredForms(forms); // Initialize filtered forms
      } catch (err) {
        console.error('Error fetching forms:', err);
        toast.error('Failed to fetch forms');
      } finally {
        setLoading(false);
      }
    }

    fetchForms();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // If the query is empty, reset to all forms
    if (query === '') {
      setFilteredForms(forms);
      return;
    }

    // Filter forms based on the search query
    const filtered = forms.filter((form) =>
      form.form_title.toLowerCase().includes(query)
    );
    setFilteredForms(filtered);
  };

  if (loading) return <p>Loading forms...</p>;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between items-center w-full max-w-6xl mb-4">
        <h2 className="text-xl font-semibold">Your Saved Forms</h2>
        <input
          type="text"
          placeholder="Search forms..."
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredForms.length === 0 ? (
        <p className="text-gray-500">No forms match your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl">
          {filteredForms.map((form, index) => (
            <div
              key={form.id || `form-${index}`} // Fallback to index if form.id is undefined
              className="border p-4 w-full rounded-lg shadow-sm bg-white flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-lg">{form.form_title}</h3>
                <p className="text-sm text-gray-500">Form ID: {form.id}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Fields: {form.fields.length}
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  className="text-sm px-3 py-1 bg-gray-950 text-white rounded hover:bg-gray-800"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `<iframe src="${process.env.NEXT_PUBLIC_BASE_URL}/form/${form.id}" style="width:100%;height:500px;border:none;"></iframe>`
                    );
                    toast.success('Embed copied to clipboard');
                  }}
                >
                  Copy Embed
                </button>
                <Link
                  href={`/form/${form.id}`}
                  className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-400"
                >
                  Preview
                </Link>
                <button
                  onClick={() => {
                    localStorage.setItem('formConfigDraft', JSON.stringify(form));
                    window.location.href = '/vendor/dashboard?tab=builder';
                  }}
                  className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}