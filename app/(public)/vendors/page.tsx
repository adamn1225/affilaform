'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { getAllVendors, PublicVendor } from '@/lib/api/vendor';
import NegotiateModal from '@/app/components/NegotiateModal';

export default function PublicVendorDirectory() {
    const [vendors, setVendors] = useState<PublicVendor[]>([]);
    const [filtered, setFiltered] = useState<PublicVendor[]>([]);
    const [industries, setIndustries] = useState<string[]>([]);
    const [search, setSearch] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState('all');
    const [sortOrder, setSortOrder] = useState('desc'); // default to highest first
    const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        getAllVendors().then((data) => {
            setVendors(data);
            setIndustries(Array.from(new Set(data.map((v) => v.industry).filter(Boolean))));
        });
    }, []);

    // Load filters from URL
    useEffect(() => {
        const industryParam = searchParams.get('industry');
        const searchParam = searchParams.get('search');
        if (industryParam) setSelectedIndustry(industryParam);
        if (searchParam) setSearch(searchParam);
    }, [searchParams]);

    // Filter logic
    useEffect(() => {
        const filteredData = vendors.filter((v) => {
            const matchesIndustry =
                selectedIndustry === 'all' || v.industry === selectedIndustry;
            const matchesSearch = v.company_name
                .toLowerCase()
                .includes(search.toLowerCase());
            return matchesIndustry && matchesSearch;
        });
        let sorted = [...filteredData];
        if (sortOrder === 'desc') {
            sorted.sort((a, b) => (b.commission ?? 0) - (a.commission ?? 0));
        } else if (sortOrder === 'asc') {
            sorted.sort((a, b) => (a.commission ?? 0) - (b.commission ?? 0));
        } else if (sortOrder === 'az') {
            sorted.sort((a, b) => a.company_name.localeCompare(b.company_name));
        } else if (sortOrder === 'za') {
            sorted.sort((a, b) => b.company_name.localeCompare(a.company_name));
        }

        setFiltered(sorted);
    }, [vendors, selectedIndustry, search]);

    // Sync filters to URL
    useEffect(() => {
        const params = new URLSearchParams();
        if (selectedIndustry !== 'all') params.set('industry', selectedIndustry);
        if (search.trim()) params.set('search', search);
        router.replace(`/vendors?${params.toString()}`);
    }, [selectedIndustry, search, router]);

    function getCommissionLabel(commission: number | null | undefined) {
        if (commission === null || commission === undefined || commission <= 0) {
            return {
                label: 'No commission available',
                style: 'text-sm text-gray-500',
            };
        }

        if (commission >= 0.15) {
            return {
                label: '🔥 High Paying',
                style: 'inline-block text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full mb-1',
            };
        }

        if (commission >= 0.1 && commission < 0.2) {
            return {
                label: '💼 Standard Offer',
                style: 'inline-block text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full mb-1',
            };
        }

        if (commission > 0 && commission < 0.1) {
            return {
                label: 'Low Tier',
                style: 'inline-block text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full mb-1',
            };
        }

        return {
            label: 'No commission available',
            style: 'text-sm text-gray-500',
        };
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 bg-white rounded shadow mt-12">
            <h1 className="text-3xl font-bold mb-4">Browse Our Vendor Partners</h1>
            <p className="text-gray-700 mb-6">
                These vendors run affiliate programs powered by AffilaForm.
            </p>

            {/* Search + Filter Controls */}

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by company name..."
                    className="border px-3 py-2 text-sm rounded w-full sm:w-1/2"
                />


                <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="border px-3 py-2 text-sm rounded w-full sm:w-1/2"
                >
                    <option value="all">All Industries</option>
                    {industries.map((industry) => (
                        <option key={industry} value={industry}>
                            {industry}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex items-center gap-2 text-sm mb-4">
                <label htmlFor="sort" className="text-gray-700">Sort by:</label>
                <select
                    id="sort"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border px-2 py-1 rounded"
                >
                    <option value="desc">Commission: High → Low</option>
                    <option value="asc">Commission: Low → High</option>
                    <option value="az">Company: A → Z</option>
                    <option value="za">Company: Z → A</option>
                </select>
            </div>
            <div className='flex justify-between px-3 items-center mb-4'>
                <div className="flex flex-wrap gap-2 mb-6 w-2/3">
                    <button
                        className={`px-3 py-1 text-sm rounded-full border ${selectedIndustry === 'all'
                            ? 'bg-black text-white'
                            : 'bg-white text-gray-700'
                            }`}
                        onClick={() => setSelectedIndustry('all')}
                    >
                        All
                    </button>
                    {industries.map((industry) => (
                        <button
                            key={industry}
                            className={`px-3 py-1 text-sm rounded-full border ${selectedIndustry === industry
                                ? 'bg-black text-white'
                                : 'bg-white text-gray-700'
                                }`}
                            onClick={() => setSelectedIndustry(industry)}
                        >
                            {industry}
                        </button>
                    ))}
                </div>
                <div className="flex justify-end gap-2 mb-4">
                    <button
                        className={`text-sm px-3 py-1 rounded border ${viewMode === 'card' ? 'bg-black text-white' : 'bg-white text-black'}`}
                        onClick={() => setViewMode('card')}
                    >
                        Card View
                    </button>
                    <button
                        className={`text-sm px-3 py-1 rounded border ${viewMode === 'table' ? 'bg-black text-white' : 'bg-white text-black'}`}
                        onClick={() => setViewMode('table')}
                    >
                        Table View
                    </button>
                </div>
            </div>

            {viewMode === 'card' ? (
                <>
                    {filtered.length === 0 ? (
                        <p>No vendors found for this filter.</p>
                    ) : (
                        <div className="w-full grid sm:grid-cols-1 lg:grid-cols-1 gap-6">
                            {filtered.map((vendor) => (
                                <div
                                    key={vendor.id}
                                    className="w-full flex flex-col items-start justify-evenly p-4 rounded-xl shadow-lg drop-shadow bg-white"
                                >
                                    <div className='flex gap-4 justify-between w-4/5'>
                                        <div className='flex flex-col items-center'>
                                            <img
                                                src={`/logos/${vendor.id}.png`}
                                                alt={`${vendor.company_name} logo`}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/logos/default.png';
                                                }}
                                                className="w-48 max-h-24 object-contain rounded bg-white p-4"
                                            />
                                            <h3 className="font-medium text-lg">{vendor.company_name}</h3>
                                            <p className="text-gray-600 text-sm mb-2">{vendor.industry}</p>
                                            {vendor.website && (
                                                <a
                                                    href={vendor.website}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-blue-500 text-sm underline"
                                                >
                                                    Visit Website
                                                </a>
                                            )}
                                        </div>
                                        <div>
                                            {(() => {
                                                const commission = vendor.commission ?? 0;
                                                const { label, style } = getCommissionLabel(commission);

                                                return (
                                                    <>
                                                        {commission > 0 ? (
                                                            <p className="text-sm text-green-700 font-medium">
                                                                Commission: {(commission * 100).toFixed(0)}%
                                                            </p>
                                                        ) : (
                                                            <p className={style}>{label}</p>
                                                        )}

                                                        {commission > 0 && <span className={style}>{label}</span>}
                                                    </>
                                                );
                                            })()}

                                            <div className='flex flex-col gap-2'>
                                                <Link
                                                    href={`/vendors/${vendor.id}`}
                                                    className="inline-block mt-4 text-sm px-4 py-1 font-semibold bg-black text-white rounded hover:bg-gray-800"
                                                >
                                                    View Program
                                                </Link>
                                                <NegotiateModal vendorId={Number(vendor.id)} vendorName={vendor.company_name} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <table className="w-full text-sm border mt-4">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2">Company</th>
                            <th className="p-2">Industry</th>
                            <th className="p-2">Commission</th>
                            <th className="p-2">Website</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((vendor) => (
                            <tr key={vendor.id} className="border-t">
                                <td className="p-2">{vendor.company_name}</td>
                                <td className="p-2">{vendor.industry}</td>
                                <td className="p-2">{((vendor.commission ?? 0) * 100).toFixed(0)}%</td>
                                <td className="p-2">
                                    {vendor.website ? (
                                        <a href={vendor.website} className="text-blue-500 underline text-xs" target="_blank">
                                            Visit
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                                <td className="px-2 py-1">
                                    <Link
                                        href={`/vendors/${vendor.id}`}
                                        className="text-sm bg-black text-white text-center px-4 py-2 font-semibold rounded hover:bg-gray-800"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}


            {/* Clickable Tags */}


            {/* Vendor Cards */}

        </div>
    );
}
