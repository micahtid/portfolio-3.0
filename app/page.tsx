import React from 'react'
import Hero from '@/components/Hero'
import Technologies from '@/components/Technologies'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { FiGift } from 'react-icons/fi'

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center px-2 gap-y-12">
      <Hero />
      <Technologies />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
      {/* Gift Button */}
      <Link
        href="/template"
        className="
        fixed z-50 bottom-4 right-4 md:bottom-10 md:right-10 
        bg-white/60 border backdrop-blur-sm border-gray-200 rounded-full p-3 md:p-4 
        flex items-center justify-center 
        hover:bg-white/80 transition-all duration-150 hover:outline-none hover:ring-2 hover:ring-blue-400"
        aria-label="Gift"
      >
        <FiGift className="text-xl md:text-2xl text-gray-700" />
      </Link>
    </div>
  )
}
