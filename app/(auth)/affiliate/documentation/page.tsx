// app/affiliate/documentation/rotators/page.tsx
'use client';

import Link from 'next/link';

export default function RotatorDocsPage() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <h1 className="text-3xl font-bold mb-6">Offer Rotators Documentation</h1>

            <section className="space-y-4 mb-10">
                <p className="text-gray-700">
                    Offer rotators let you embed one rotating link that automatically switches between multiple destinations.
                    This is useful for A/B testing landing pages, load balancing traffic, or giving your audience fresh content.
                </p>

                <p className="text-gray-700">
                    Each rotator has a unique <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">slug</code> and a defined
                    <strong> strategy</strong> such as random or (soon) weighted priority. You can monitor click stats and manage
                    links from your affiliate dashboard.
                </p>
            </section>

            <section className="space-y-4 mb-10">
                <h2 className="text-xl font-semibold">🔗 Embed Link</h2>
                <p className="text-gray-700">
                    Your embed URL will look like this:
                </p>
                <code className="block bg-gray-100 p-2 rounded text-sm">
                    https://yourdomain.com/r/&lt;slug&gt;
                </code>
                <p className="text-gray-600">
                    Simply share or embed this link anywhere — visitors will be redirected to one of the linked destinations.
                </p>
            </section>

            <section className="space-y-4 mb-10">
                <h2 className="text-xl font-semibold"> Managing Your Rotator</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Create new rotators from your <Link className="text-blue-600 hover:underline" href="/affiliate/rotators">Rotators Dashboard</Link>.</li>
                    <li>Add or remove destination links.</li>
                    <li>Edit the rotator’s name or strategy.</li>
                    <li>View real-time click counts per link.</li>
                </ul>
            </section>

            <section className="space-y-4 mb-10">
                <h2 className="text-xl font-semibold">🚀 Coming Soon</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li> Detailed analytics and click heatmaps</li>
                    <li> Smart rules (e.g., country/device-based targeting)</li>
                    <li> CRM and Zapier/n8n integrations</li>
                    <li> Affiliate offer library and sharing system</li>
                </ul>
            </section>
        </div>
    );
}
