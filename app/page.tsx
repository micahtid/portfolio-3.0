import React from 'react'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Noise overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.085
        }}
      />
      
      {/* Content */}
      <div className="relative" style={{ zIndex: 2 }}>
        <Hero />
      </div>
    </main>
  )
}
