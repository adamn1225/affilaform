'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '@/public/logo.png';
import LogoutButton from '@/components/ui/LogoutButton';
import { Users, BookOpen, LifeBuoy, UserCog, LayoutDashboard, ChevronDown, ChevronRight, Rocket, CreditCard } from 'lucide-react';


export default function VendorSideNav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dashboardOpen, setDashboardOpen] = useState(true);
    const pathname = usePathname();

    const navItems = [
        {
            label: 'Dashboard',
            href: '/vendor/dashboard',
            icon: <LayoutDashboard size={20} />,
        },
        {
            label: 'Wallet Settings',
            href: '/vendor/wallet-settings',
            icon: <CreditCard size={20} />,
        },
        {
            label: 'Affiliates',
            href: '/vendor/affiliates',
            icon: <Users size={20} />,
        },
        {
            label: 'Guides',
            href: '/vendor/documentation',
            icon: <BookOpen size={20} />,
        },
        {
            label: 'Support',
            href: '/vendor/support',
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
                        <div className="flex items-center space-x-2">
                            <Image src={logo} alt="Logo" width={160} height={40} />
                        </div>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex-1 p-6 space-y-2 text-sm font-medium">
                        {/* Dashboard Collapsible */}



                        {/* Static Links */}
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
                        <div
                            onClick={() => setDashboardOpen(!dashboardOpen)}
                            className="flex items-center justify-between pl-3 pr-6 py-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                            <span className="flex items-center gap-2">
                                <Rocket size={20} />
                                Quick Links
                            </span>
                            {dashboardOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </div>

                        {dashboardOpen && (
                            <div className="ml-12 mt-2 flex flex-col gap-2 text-xs font-semibold text-gray-400">
                                <Link
                                    href="/vendor/your-forms"
                                    className={`hover:text-white transition-colors text-left ${pathname === '/vendor/your-forms' ? 'text-white font-bold' : ''
                                        }`}
                                >
                                    Your Forms
                                </Link>
                                <Link
                                    href="/vendor/form-submissions"
                                    className={`hover:text-white transition-colors text-left ${pathname === '/vendor/form-submissions' ? 'text-white font-bold' : ''
                                        }`}
                                >
                                    Form Submissions
                                </Link>
                                <Link
                                    href="/vendor/aff-form-builder"
                                    className={`hover:text-white transition-colors text-left ${pathname === '/vendor/aff-form-builder' ? 'text-white font-bold' : ''
                                        }`}
                                >
                                    New Form
                                </Link>
                            </div>
                        )}
                    </nav>


                    {/* Logout */}
                    <div className="p-6 flex flex-col gap-2 border-t border-gray-800">
                        <Link
                            href="/vendor/your-settings"
                            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${pathname === '/vendor/your-settings'
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
