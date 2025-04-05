import React from 'react';
import Link from 'next/link';
import { VendorSignupButton, AffiliateSignupButton } from '@/components/forms/SignupButtons'

export default function HeroSection() {
    return (
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-950 sm:text-5xl">
            Affiliate Form Marketing
          </h1>
          <h2 className="mt-4 text-2xl text-gray-950">
            Join our platform to boost your business with powerful affiliate marketing tools.
            Whether you're a vendor or an affiliate, we have the perfect solution for you.
          </h2>
          <div className="mt-6 flex justify-center space-x-4">
          <VendorSignupButton />
          <AffiliateSignupButton />
          </div>
        </div>
      </section>
    );
  }