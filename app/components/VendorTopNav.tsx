'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo.png';
import LogoutButton from '@/components/ui/LogoutButton'

export default function VendorTopNav() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-gray-950 text-white">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex md:justify-between items-center h-16">
                    {/* Logo */}
                    <div className="hidden md:flex items-center">
                        <Link href="/" className="text-xl font-bold">
                            <Image src={logo} alt="Logo" width={175} height={0} className="inline-block mr-2" />
                        </Link>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-4 text-white font-semibold text-lg">
                        <Link href="#features" className="hover:text-gray-300 underline underline-offset-4">
                            Affiliates
                        </Link>
                        <Link href="#pricing" className="hover:text-gray-300 underline underline-offset-4">
                            Documentation
                        </Link>
                        <Link href="#contact" className="hover:text-gray-300 underline underline-offset-4">
                            Support
                        </Link>
                        <LogoutButton />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-white font-semibold text-lg underline underline-offset-4"
                    >
                        Menu
                    </button>
                    <Link href="/" className="text-xl pl-12 font-bold md:hidden">
                        <Image src={logo} alt="Logo" width={175} height={0} className="inline-block mr-2" />
                    </Link>
                </div>

                {/* Mobile Links */}
                {menuOpen && (
                    <div className="bg-gray-800 absolute top-16.1 left-0 w-2/3 md:hidden">
                        <div className="tracking-widest flex flex-col items-start text-base font-semibold pl-6 space-y-2 mt-2 ml-auto h-screen md:hidden">
                            <Link href="#pricing" className="hover:text-gray-300 underline underline-offset-4">
                                Documentation
                            </Link>
                            <Link href="#contact" className="hover:text-gray-300 underline underline-offset-4">
                                Support
                            </Link>
                            <LogoutButton />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}