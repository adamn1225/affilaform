'use client'

import React, { useState, useEffect } from 'react'
import type { FormField, FormConfig, FormOption, FormWidth } from './types'
import { LayoutTemplate } from 'lucide-react'

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
    showAsModal: boolean
    setShowAsModal: (val: boolean) => void
    formWidth: 'sm' | 'md' | 'lg' | 'xl'
    setFormWidth: (val: 'sm' | 'md' | 'lg' | 'xl') => void
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
    showAsModal,
    setShowAsModal,
    formWidth,
    setFormWidth,
}: Props) {
    type Tab = 'fields' | 'settings' | 'integrations';

    const [activeTab, setActiveTab] = useState<Tab>('fields');

    return (
        <div className="space-y-1 bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Form Settings</h2>
            <div className="flex gap-1">
                <button
                    onClick={() => setActiveTab('fields')}
                    className={`py-2 px-4 rounded ${activeTab === 'fields' ? 'bg-gray-200' : 'bg-gray-100'}`}
                >
                    Fields
                </button>
                <button
                    onClick={() => setActiveTab('settings')}
                    className={`py-2 px-4 rounded ${activeTab === 'settings' ? 'bg-gray-200' : 'bg-gray-100'}`}
                >
                    Settings
                </button>
                <button
                    onClick={() => setActiveTab('integrations')}
                    className={`py-2 px-4 rounded ${activeTab === 'integrations' ? 'bg-gray-200' : 'bg-gray-100'}`}
                >
                    Integrations
                </button>
            </div>
            {activeTab === 'fields' && (
                <div className='flex gap-2 items-center pt-2 border-t'>
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
                </div>
            )}
            {activeTab === 'settings' && (



                <div className="flex items-center justify-evenly gap-3 pt-2 border-t">
                    <div className='flex items-center'>
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                            <LayoutTemplate size={18} />
                            Show as Modal?
                            <input
                                type="checkbox"
                                checked={showAsModal}
                                onChange={(e) => setShowAsModal(e.target.checked)}
                                className=""
                            />
                        </label>
                    </div>
                    <div className="flex items-center gap-1">
                        <label className="text-sm font-medium">Button Color:</label>
                        <input
                            type="color"
                            value={buttonColor}
                            onChange={(e) => setButtonColor(e.target.value)}
                            className="w-6 h-6 border border-gray-300"
                        />
                    </div>
                    <div className='w-1/3'>
                        <label className="block text-sm font-semibold mb-1">Form Width</label>
                        <select
                            value={formWidth}
                            onChange={(e) => setFormWidth(e.target.value as any)}
                            className="w-full p-1 border rounded"
                        >
                            <option value="sm">Small</option>
                            <option value="md">Medium</option>
                            <option value="lg">Large</option>
                            <option value="xl">Extra Large</option>
                        </select>
                    </div>
                </div>
            )}
            {activeTab === 'integrations' && (
                <>
                    <div className="hidden pt-3 border-t">
                        <label className="block text-sm font-semibold mb-1">Affiliate GA4 ID</label>
                        <input
                            value={affiliateGA4ID}
                            onChange={(e) => setAffiliateGA4ID(e.target.value)}
                            placeholder="G-XXXXXXX"
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="pt-4 border-t">
                        <label className="block text-sm font-semibold mb-1">Form APIs (Coming soon)</label>
                        <select
                            value={affiliateGA4ID}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select</option>
                            <option value="googlePlaces">Google Places API</option>
                            <option value="Custom API">Zapier</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Vendor GA4 ID</label>
                        <input
                            value={vendorGA4ID}
                            onChange={(e) => setVendorGA4ID(e.target.value)}
                            placeholder="G-YYYYYYY"
                            className="w-full p-2 border rounded"
                        />
                        <p className="text-xs text-gray-500">Used to track conversions in your Google Analytics property.</p>
                    </div>
                </>
            )}
        </div>
    )
}
