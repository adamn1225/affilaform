'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getVendorCommission, VendorCommission, updateVendorCommission, getVendorWallet } from '@/lib/api/vendor';

export default function VendorSettings() {
    const [commission, setCommission] = useState<number | ''>('');
    const [walletBalance, setWalletBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [vendorCommission, setVendorCommission] = useState<VendorCommission | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const commissionRes = await getVendorCommission();
                console.log('Fetched Vendor Commission:', commissionRes); // Debug log
                if (commissionRes) {
                    setVendorCommission(commissionRes);
                    setCommission(commissionRes.Commission);
                }
            } catch (err) {
                console.error('Error loading vendor commission:', err);
                toast.error('Failed to load settings');
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    useEffect(() => {
        const fetchWallet = async () => {
            try {
                const walletRes = await getVendorWallet();
                console.log('Fetched Wallet:', walletRes); // Debug log
                if (walletRes) {
                    setWalletBalance(walletRes.balance ?? null);
                }
            } catch (err) {
                console.error('Error loading vendor wallet:', err);
            }
        };

        fetchWallet();
    }, []);

    useEffect(() => {
        const fetchCommission = async () => {
            try {
                const commissionRes = await getVendorCommission();
                console.log('Fetched Vendor Commission:', commissionRes); // Debug log
                if (commissionRes) {
                    setVendorCommission(commissionRes);
                    setCommission(commissionRes.Commission);
                }
            } catch (err) {
                console.error('Error loading vendor commission:', err);
                toast.error('Failed to load settings');
            } finally {
                setLoading(false);
            }
        };
        fetchCommission();
    }, []);

    const saveCommission = async () => {
        if (typeof commission === 'number' && (commission < 0 || commission > 100)) {
            toast.error('Commission must be between 0 and 100.');
            return;
        }

        try {
            await updateVendorCommission(parseFloat(String(commission)));
            toast.success('Commission updated');
        } catch (err) {
            toast.error('Failed to update commission');
        }
    };

    return (
        <div className="space-y-6 max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md border">
            <h2 className="text-2xl font-bold">Wallet & Commission Settings</h2>

            <div className="space-y-2">
                <label htmlFor="commission" className="block font-medium text-gray-700">
                    {vendorCommission && (
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold underline">Vendor Commission Details</h3>

                            <span className='flex gap-2'> <p>Commission Rate:</p> <p className='text-green-600 font-medium'>{vendorCommission.Commission}%</p></span>
                        </div>
                    )}
                </label>
                <input
                    type="number"
                    step="0.01"
                    id="commission"
                    value={commission}
                    onChange={(e) => setCommission(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <button
                    onClick={saveCommission}
                    disabled={commission === '' || isNaN(Number(commission))}
                    className={`mt-2 px-4 py-2 rounded-md ${commission === '' || isNaN(Number(commission))
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-black text-white hover:bg-gray-800'
                        }`}
                >
                    Save Commission
                </button>
            </div>

            <div className="border-t pt-6 space-y-2">
                <h3 className="text-lg font-semibold">Wallet Balance</h3>
                <p className="text-xl font-mono text-green-600">${walletBalance?.toFixed(2) ?? '0.00'}</p>

                {walletBalance !== null && walletBalance < 25 && (
                    <p className="text-sm text-red-500">
                        Balance is below minimum required to process payouts.
                    </p>
                )}

                <button
                    disabled
                    className="mt-2 bg-gray-200 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed"
                >
                    Top-up Wallet (Coming Soon)
                </button>
            </div>
        </div>
    );
}