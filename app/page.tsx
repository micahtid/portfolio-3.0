import React from 'react'

import Hero from '@/components/Hero'
import Technologies from '@/components/Technologies'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center px-2 gap-y-12">
      <Hero />
      <Technologies />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}
