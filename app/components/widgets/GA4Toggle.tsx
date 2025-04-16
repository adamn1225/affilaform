'use client';

import { useState } from 'react';

export default function GA4Toggle() {
    const [enabled, setEnabled] = useState(false);

    const toggle = () => {
        setEnabled(prev => !prev);
        // TODO: api call to persist setting
    };

    return (
        <div className="bg-gray-800 border rounded-lg p-4 shadow flex flex-col gap-2">
            <h3 className="font-semibold text-white text-lg">Google Analytics 4</h3>
            <p className="text-sm text-gray-50">Enable click and conversion tracking via GA4.</p>
            <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 relative transition-all duration-200">
                    <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-200 peer-checked:translate-x-5" />
                </div>
                <span className="text-base pl-2 font-normal text-white">{enabled ? 'Enabled' : 'Disabled'}</span>
            </label>
        </div>
    );
}
