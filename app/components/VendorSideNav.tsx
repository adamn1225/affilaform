'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '@/public/logo.png';
import LogoutButton from '@/components/ui/LogoutButton';
import { Users, BookOpen, LifeBuoy, LogOut, LayoutDashboard, ChevronDown, ChevronRight } from 'lucide-react';
import { useTab } from '@/context/TabContext';

export default function VendorSideNav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dashboardOpen, setDashboardOpen] = useState(true);
    const pathname = usePathname();
    const { setTab } = useTab();

    const navItems = [
        {
            label: 'Affiliates',
            href: '/vendor/affiliates',
            icon: <Users size={20} />,
        },
        {
            label: 'Documentation',
            href: '/vendor/docs',
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
                        <Link href="/" className="flex items-center space-x-2">
                            <Image src={logo} alt="Logo" width={160} height={40} />
                        </Link>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex-1 p-6 space-y-2 text-sm font-medium">
                        {/* Dashboard Collapsible */}
                        <div>
                            <div
                                onClick={() => setDashboardOpen(!dashboardOpen)}
                                className="flex items-center justify-between px-5 py-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
                            >
                                <span className="flex items-center gap-2">
                                    <LayoutDashboard size={20} />
                                    Dashboard
                                </span>
                                {dashboardOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            </div>

                            {dashboardOpen && (
                                <div className="ml-12 mt-2 flex flex-col gap-2 text-sm text-gray-400">
                                    <button
                                        onClick={() => setTab('submissions')}
                                        className="hover:text-white transition-colors text-left"
                                    >
                                        Submissions
                                    </button>
                                    <button
                                        onClick={() => setTab('forms')}
                                        className="hover:text-white transition-colors text-left"
                                    >
                                        Your Forms
                                    </button>
                                    <button
                                        onClick={() => setTab('builder')}
                                        className="hover:text-white transition-colors text-left"
                                    >
                                        New Form
                                    </button>
                                </div>
                            )}
                        </div>

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
                    </nav>

                    {/* Logout */}
                    <div className="p-6 border-t border-gray-800">
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
