import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getVendorById, PublicVendor } from '@/lib/api/vendor';

interface VendorDetailPageProps {
    params: { id: string };
}

export default async function VendorDetailPage({ params }: VendorDetailPageProps) {
    const vendor: PublicVendor | null = await getVendorById(params.id);

    if (!vendor) return notFound();

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Link
                href="/affiliate/vendors"
                className="text-blue-600 text-sm underline hover:text-blue-800 mb-6 inline-block"
            >
                &larr; Back to Vendor List
            </Link>

            <div className="bg-white border rounded-2xl shadow p-6">
                <h1 className="text-2xl font-bold mb-2">{vendor.company_name}</h1>
                <p className="text-gray-600 mb-1">Industry: {vendor.industry}</p>

                {vendor.description && (
                    <p className="text-gray-700 mb-4">{vendor.description}</p>
                )}

                {vendor.website && (
                    <a
                        href={vendor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-sm"
                    >
                        Visit Website
                    </a>
                )}

                <div className="mt-6">
                    <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 text-sm">
                        Apply to Promote
                    </button>
                </div>
            </div>
        </div>
    );
}
