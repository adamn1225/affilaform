'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api/apiFetch';
import toast from 'react-hot-toast';

interface RotatorPreviewResponse {
  url: string;
  name: string;
  strategy: string;
  vendor_id?: number;
}

export default function RotatorPreviewPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [data, setData] = useState<RotatorPreviewResponse | null>(null);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const res = await apiFetch(`/api/public/rotators/${slug}`);
        console.log('[Preview Fetch Result]', res);
        if (!res?.url) throw new Error('Missing URL');
    
        setData(res);
    
        // Countdown and redirect logic
        let remaining = 3;
        setCountdown(remaining);
    
        const interval = setInterval(() => {
          remaining -= 1;
          setCountdown(remaining);
    
          if (remaining <= 0) {
            clearInterval(interval);
            router.push(res.url);
          }
        }, 1000);
      } catch (err) {
        console.error('[Preview Error]', err);
        router.push('/');
      }
    };
    
    fetchLink();
  }, [slug, router]);


  if (!data) return <div className="p-6 text-center">Loading preview...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <img
              src={
                data?.vendor_id
                  ? `/logos/${data.vendor_id}.png`
                  : '/logo.png'
              }
              alt={`${data.name} Logo`}
              className="mx-auto mb-4 h-12 object-contain fade-in"
            />
        <h1 className="text-xl font-semibold mb-2">
          Redirecting you to an offer from <span className="text-blue-700">{data.name}</span>
        </h1>
        <p className="text-gray-500 mb-6">Hold tight. You'll be redirected in {countdown}...</p>
        <button
          onClick={() => router.push(data.url)}
          className="text-sm bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Skip Waiting &rarr;
        </button>
      </div>
    </div>
  );
}
