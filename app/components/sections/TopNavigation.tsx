import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo.png';

export default function TopNavigation() {
    return (
      <nav className="bg-gray-950 text-white">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold">
                <Image src={logo} alt="Logo" width={200} height={0} className="inline-block mr-2" />
                
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4 text-white font-semibold text-lg">
              <Link href="#features" className="hover:text-gray-300 underline underline-offset-4">
                Features
              </Link>
              <Link href="#pricing" className="hover:text-gray-300 underline underline-offset-4">
                Pricing
              </Link>
              <Link href="#contact" className="hover:text-gray-300 underline underline-offset-4">
                Contact
              </Link>
              <Link
                href="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }