import React, { useState } from 'react';
import { PublicVendor } from '@/lib/api/vendor';

export async function VendorVisibilityToggle({ vendor }: { vendor: PublicVendor }) {
    const [isPublic, setIsPublic] = useState(vendor.public);

    const toggleVisibility = async () => {
        const res = await fetch(`/api/vendor/visibility`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ public: !isPublic }),
        });
        if (res.ok) {
            setIsPublic(!isPublic);
        }
    };

    return (
        <button
            onClick={toggleVisibility}
            className={`px-4 py-2 rounded ${isPublic ? 'bg-green-500' : 'bg-gray-500'} text-white`}
        >
            {isPublic ? 'Make Private' : 'Make Public'}
        </button>
    );
}