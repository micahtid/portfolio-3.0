import React from 'react'

import Hero from '@/components/Hero'
import Technologies from '@/components/Technologies'
import Projects from '@/components/Projects'

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center px-2 gap-y-12">
      <Hero />
      <Technologies />
      <Projects />
    </div>
  )
}
