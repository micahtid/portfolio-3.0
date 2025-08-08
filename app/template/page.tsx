"use client";

import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

export default function TemplatePage() {
  return (
    <section className="max-w-[1200px] w-full mx-auto px-3 py-16 max-lg:py-8">
      <Link
        href="/"
        className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-8 group transition-colors"
      >
        <HiArrowLeft className="mr-2 text-sm" />
        Back
      </Link>
      <div className="mb-8 pb-4 border-b border-gray-200">
        <h1 className="default-subheading font-bold mb-5">You Found Me!</h1>
        <p className="default-text text-gray-600">
          If you&apos;re interested in the web apps I build, you might enjoy my <span className="font-semibold">React Starter Kit</span>—a minimalist foundation for modern web projects.<br /><br />
          <span className="font-medium">Features:</span>
          <ul className="list-disc list-inside my-3 text-gray-500">
            <li>Firebase authentication</li>
            <li>Stripe-powered subscriptions</li>
            <li>React &amp; Next.js architecture</li>
            <li>Prebuilt, customizable components</li>
          </ul>
          <br />
          <span className="font-semibold">Check out the repository below and leave a star!</span>
        </p>
      </div>
      <Link
        href="https://github.com/Not-Micah/react-starter-kit"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-6 py-2 rounded-md border border-gray-200 bg-white/60 hover:bg-white/80 text-gray-900 font-semibold text-base transition-colors"
      >
        GitHub Repository
      </Link>
    </section>
  );
}