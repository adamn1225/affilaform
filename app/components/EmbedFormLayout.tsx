'use client'

import { ReactNode } from 'react'

export default function EmbedFormLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-2xl">
                {children}
            </div>
        </div>
    )
}
