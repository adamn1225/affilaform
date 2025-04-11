'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '@/public/logo.png';
import LogoutButton from '@/components/ui/LogoutButton';
import {
    LayoutDashboard,
    RefreshCcw,
    CreditCard,
    BookOpen,
    LifeBuoy,
    UserCog,
    Users,
} from 'lucide-react';

export default function AffiliateSideNav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        {
            label: 'Dashboard',
            href: '/affiliate/dashboard',
            icon: <LayoutDashboard size={20} />,
        },
        {
            label: 'Vendors',
            href: '/affiliate/vendors',
            icon: <Users size={20} />,
        },
        {
            label: 'Offer Rotators',
            href: '/affiliate/rotators',
            icon: <RefreshCcw size={20} />,
        },
        {
            label: 'Payout History',
            href: '/affiliate/payouts',
            icon: <CreditCard size={20} />,
        },
        {
            label: 'Documentation',
            href: '/affiliate/documentation',
            icon: <BookOpen size={20} />,
        },
        {
            label: 'Support',
            href: '/affiliate/support',
            icon: <LifeBuoy size={20} />,
        },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-4 text-white bg-gray-900 fixed top-4 left-4 z-50 rounded-md"
            >
                ☰
            </button>

            {/* Sidebar */}
            <aside
                className={`bg-gray-950 text-white w-52 fixed top-0 left-0 h-full z-40 transform transition-transform duration-200 ease-in-out
          ${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-gray-800">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image src={logo} alt="Logo" width={160} height={40} />
                        </Link>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex-1 p-6 space-y-2 text-sm font-medium">
                        {navItems.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive
                                        ? 'bg-gray-800 text-white font-semibold border-l-4 border-blue-500'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                        }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer Links */}
                    <div className="p-6 flex flex-col gap-2 border-t border-gray-800">
                        <Link
                            href="/affiliate/settings"
                            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${pathname === '/affiliate/settings'
                                ? 'bg-gray-800 text-white font-bold border-l-4 border-blue-500'
                                : 'text-gray-300 font-bold hover:text-white hover:bg-gray-800'
                                }`}
                        >
                            <UserCog size={20} />
                            Settings
                        </Link>
                        <LogoutButton />
                    </div>
                </div>
            </aside>

            {/* Overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}
        </>
    );
}
