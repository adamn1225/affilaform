'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo.png';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function TopNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setloginOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white">
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
            <Link href="/vendors" className="hover:text-gray-300 underline underline-offset-4">
              Listings
            </Link>
            <div className="relative">
              <button
                onClick={() => setloginOpen(!loginOpen)}
                className="flex items-center space-x-1 bg-blue-500 px-3 py-1 rounded text-white font-semibold text-lg"
              >
                <span>Login</span>
                {loginOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {loginOpen && (
                <div className="absolute right-[-15px] mt-3 w-48 h-fit bg-gray-700 drop-shadow rounded-md shadow-lg z-10">

                  <Link href="/login/vendor" className="block py-4 h-fit text-center text-base hover:bg-gray-600 hover:underline hover:underline-offset-4">
                    Vendor Login
                  </Link>
                  <Link href="/login/affiliate/" className="block py-4 h-fit text-center text-base hover:bg-gray-600 hover:underline hover:underline-offset-4">
                    Affiliate Login
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden  text-white font-semibold text-lg underline underline-offset-4"
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
              <Link href="#features" className="hover:text-gray-300 underline underline-offset-4">
                Affiliates
              </Link>
              <Link href="#pricing" className="hover:text-gray-300 underline underline-offset-4">
                Documentation
              </Link>
              <Link href="#contact" className="hover:text-gray-300 underline underline-offset-4">
                Support
              </Link>
              <div className='flex flex-col gap-2'>
                <Link
                  href="/login/vendor"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Vendor Login
                </Link>
                <Link
                  href="/login/affiliate"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Affiliate Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}