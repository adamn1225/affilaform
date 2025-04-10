'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { apiFetch } from '@/lib/api/apiFetch';

export default function Support() {
    const [supportType, setSupportType] = useState<'general' | 'technical' | 'billing'>('general');
    const [loading, setLoading] = useState(true);
    const [supportOptions, setSupportOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [formDraft, setFormDraft] = useState<any | null>(null);

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold mt-4 text-center w-full">Contact Support</h1>
            <div className='flex gap-2 items-start w-full max-w-5xl mx-auto'>
                <aside className="w-1/5 border-r border-slate-400 pr-2">
                    <h2 className="text-lg font-semibold mt-4 mb-2 underline underline-offset-4">Support Type</h2>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <button
                                onClick={() => setSupportType('general')}
                                className={`w-full text-left px-2 py-1 rounded-md ${supportType === 'general' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                            >
                                General Inquiry
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setSupportType('technical')}
                                className={`w-full text-left px-2 py-1 rounded-md ${supportType === 'technical' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                            >
                                Technical Support
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setSupportType('billing')}
                                className={`w-full text-left px-2 py-1 rounded-md ${supportType === 'billing' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                            >
                                Billing Inquiry
                            </button>
                        </li>
                    </ul>
                </aside>
                <div className="w-2/3 bg-white shadow-md rounded-md p-6">

                    {supportType === 'general' && (
                        <div>
                            <h2 className="text-lg font-semibold mb-4">General Inquiry</h2>
                            <p>Please provide details about your inquiry.</p>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-md"
                                rows={4}
                                placeholder="Type your message here..."
                            />
                        </div>
                    )}
                    {supportType === 'technical' && (
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Technical Support</h2>
                            <p>Please provide details about the technical issue.</p>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-md"
                                rows={4}
                                placeholder="Type your message here..."
                            />
                        </div>
                    )}
                    {supportType === 'billing' && (
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Billing Inquiry</h2>
                            <p>Please provide details about your billing inquiry.</p>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-md"
                                rows={4}
                                placeholder="Type your message here..."
                            />
                        </div>
                    )}
                    <div className='flex gap-4'>
                        <button
                            onClick={() => {
                                toast.success('Your message has been sent successfully!');
                                setFormDraft(null);
                            }}
                            className={`mt-4 px-4 py-2 rounded-md ${formDraft === null
                                ? 'bg-blue-200 text-blue-600 hover:bg-blue-300 cursor-not-allowed'
                                : 'bg-black text-white hover:bg-gray-800'
                                }`}
                        >
                            Send Message
                        </button>
                        <button
                            onClick={() => {
                                toast.error('Failed to send message');
                                setFormDraft(null);
                            }}
                            className={`mt-4 px-4 py-2 rounded-md ${formDraft === null
                                ? 'bg-gray-200 text-gray-500 hover:bg-gray-300 cursor-not-allowed'
                                : 'bg-red-500 text-white hover:bg-red-700'
                                }`}
                        >
                            Cancel
                        </button>
                    </div>



                </div>
            </div>
        </div>
    )
}