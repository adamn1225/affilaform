import React from 'react';
import Link from 'next/link';

export default function CallToActions() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl px-20 font-bold text-gray-900">
          Join and connect with partners in your industry who are using AffilaForm to grow their business.
        </h2>
        <h2 className="mt-6 text-xl text-gray-800 font-semibold">

          Ready to take your marketing to a different type of level?
        </h2>
        <div className="mt-3 flex justify-center space-x-4">
          <Link
            href="/signup"
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}