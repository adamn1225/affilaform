'use client'

import React from 'react'

type Props = {
    formTitle: string
    setFormTitle: (val: string) => void
    buttonText: string
    setButtonText: (val: string) => void
    buttonColor: string
    setButtonColor: (val: string) => void
    affiliateGA4ID: string
    setAffiliateGA4ID: (val: string) => void
    vendorGA4ID: string
    setVendorGA4ID: (val: string) => void
}

export default function FormBuilderSettings({
    formTitle,
    setFormTitle,
    buttonText,
    setButtonText,
    buttonColor,
    setButtonColor,
    affiliateGA4ID,
    setAffiliateGA4ID,
    vendorGA4ID,
    setVendorGA4ID,
}: Props) {
    return (
        <div className="space-y-4 bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Form Settings</h2>

            <input
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Form Title"
                className="w-full p-2 border rounded"
            />

            <input
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                placeholder="Button Text"
                className="w-full p-2 border rounded"
            />

            <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Button Color:</label>
                <input
                    type="color"
                    value={buttonColor}
                    onChange={(e) => setButtonColor(e.target.value)}
                    className="w-12 h-8 p-0 border rounded"
                />
            </div>

            <div className="hidden pt-4 border-t">

                <label className="block text-sm font-semibold mb-1">Affiliate GA4 ID</label>
                <input
                    value={affiliateGA4ID}
                    onChange={(e) => setAffiliateGA4ID(e.target.value)}
                    placeholder="G-XXXXXXX"
                    className="w-full p-2 border rounded"
                />
            </div>

            <div>

                <label className="block text-sm font-semibold mb-1">GA4 ID (optional)</label>
                <input
                    value={vendorGA4ID}
                    onChange={(e) => setVendorGA4ID(e.target.value)}
                    placeholder="G-YYYYYYY"
                    className="w-full p-2 border rounded"
                />
                <p className="text-xs text-gray-500">Used to track conversions in your Google Analytics property.</p>

            </div>
        </div>
    )
}
