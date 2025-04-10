'use client'

import React from 'react'
import { CheckCircle } from 'lucide-react'
import VendorDash from '@/public/vendor-dashboard.png';
import Image from 'next/image';

const keyPoints = [
    'Targeted affiliate traffic, not cold leads.',
    'Custom-branded forms that embed anywhere.',
    'Commission tracking + payouts in your control.',
    'Analytics, lead history, and export options.',
    'Simple vendor dashboard, fast affiliate onboarding.',
]

export default function KeyPoints() {
    return (
        <section className="bg-white py-12 px-6 md:px-8 lg:px-12 text-gray-900">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                    Unlock Growth by Letting Affiliates Sell for You.
                </h1>
                <p className="text-lg md:text-xl md:px-40 text-gray-600 mb-12">
                    AffilaForm lets vendors create custom lead gen forms, track affiliate referrals, and pay out commissions — all from a single dashboard. No setup fees. No bloat. Just leads.
                </p>

                <div className='flex justify-between w-full'>
                    <div className="text-left max-w-2xl mx-auto space-y-8">
                        {keyPoints.map((point, i) => (
                            <div key={i} className="flex items-start gap-3 text-gray-800">
                                <CheckCircle className="text-green-600 mt-1" size={20} />
                                <span>{point}</span>
                            </div>
                        ))}
                    </div>
                    <div className="hidden lg:block">
                        <Image
                            src={VendorDash}
                            alt="Vendor Dashboard"
                            className="w-full max-w-xl rounded-lg shadow-lg"
                            width={0}
                            height={0}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
