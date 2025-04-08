'use client'

import { useEffect, useState } from 'react'
import { getMyForms, FormConfig } from '@/lib/api/forms'
import toast from 'react-hot-toast'

export default function VendorForms() {
  const [forms, setForms] = useState<FormConfig[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchForms() {
      try {
        const forms = await getMyForms();
        console.log('Fetched forms:', forms); // Log the entire forms array
        setForms(forms);
      } catch (err) {
        console.error('Error fetching forms:', err);
        toast.error('Failed to fetch forms');
      } finally {
        setLoading(false);
      }
    }

    fetchForms();
  }, []);

  if (loading) return <p>Loading forms...</p>

  return (
    <div className='flex flex-col items-center w-full'>
      <h2 className="text-xl font-semibold mb-4">Your Saved Forms</h2>

      {forms.length === 0 ? (
        <p className="text-gray-500">No forms created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl">
          {forms.map((form, index) => (
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
                  className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"

                  onClick={() => {
                    navigator.clipboard.writeText(
                      `<iframe src="${process.env.NEXT_PUBLIC_BASE_URL}/form/${form.id}" style="width:100%;height:500px;border:none;"></iframe>`
                    );
                    toast.success('Embed copied to clipboard');
                  }}
                >
                  Copy Embed
                </button>
                <a
                  href={`/form/${form.id}`}
                  target="_blank"
                  className="text-sm px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
                >
                  Preview
                </a>
                <button
                  onClick={() => {
                    localStorage.setItem('formConfigDraft', JSON.stringify(form));
                    window.location.href = '/vendor/dashboard?tab=builder'
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
  )
}
