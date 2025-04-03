import React from 'react'

import Hero from '@/components/Hero'
import Portfolio from '@/components/Portfolio'

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center px-2 gap-y-12">
      <Hero />
      <Portfolio />
    </div>
  )
}
