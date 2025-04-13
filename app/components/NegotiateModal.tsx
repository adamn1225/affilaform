'use client';
import React, { useState, useContext } from 'react';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useAuth } from '@/context/UserContext'; // Import your actual authentication context

type Props = {
    vendorId: number;
    vendorName: string;
};

export default function NegotiateModal({ vendorId, vendorName }: Props) {
    const user = useAuth();
console.log('User in NegotiateModal:', user);
    const isLoggedIn = !!user; // Determine if the user is logged in

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async () => {
        if (!email || !message) {
            toast.error('Please fill out all fields.');
            return;
        }

        try {
            const res = await fetch('/api/affiliate/negotiate', {
                method: 'POST',
                body: JSON.stringify({ vendorId, email, message }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (res.ok) {
                toast.success('Request submitted!');
                setOpen(false);
                setEmail('');
                setMessage('');
            } else {
                toast.error('Something went wrong.');
            }
        } catch (err) {
            console.error(err);
            toast.error('Network error.');
        }
    };

    if (!isLoggedIn) {
        // If the user is not logged in, show a message with links to login or signup
        return (
            <div className="text-center text-wrapped">
                <p className="text-sm text-gray-700 mb-2">
                    Interested in partnering with this vendor? <br />{' '}
                    <Link href="/login/affiliate" className="text-blue-500 underline">
                        Login
                    </Link>{' '}
                    or{' '}
                    <Link href="/signup/affiliate" className="text-blue-500 underline">
                        create an account
                    </Link>
                    !
                </p>
            </div>
        );
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="text-sm px-3 py-1 rounded bg-green-500 hover:bg-green-400 text-white font-semibold"
            >
                Negotiate
            </button>

            <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md">
                        <Dialog.Title className="text-lg font-semibold mb-2">
                            Negotiate with {vendorName}
                        </Dialog.Title>
                        <p className="text-sm text-gray-600 mb-4">
                            Briefly explain why you’d like a better commission rate.
                        </p>

                        <input
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded p-2 mb-3 text-sm"
                        />
                        <textarea
                            placeholder="Justification..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                            className="w-full border rounded p-2 text-sm"
                        />

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setOpen(false)}
                                className="text-sm text-gray-600 hover:underline"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800"
                            >
                                Submit
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
}