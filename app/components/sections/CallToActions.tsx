import React from 'react';
import Link from 'next/link';

export default function CallToActions() {
    return (
      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready to take the next step?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join thousands of users who trust MyApp to boost their productivity.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <Link
              href="/signup"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded text-base"
            >
              Sign Up Now
            </Link>
            <Link
              href="/contact"
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-2 rounded text-base"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    );
  }