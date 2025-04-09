'use client'

import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturedProducts from './components/FeaturedProducts'
import CTASection from './components/CTASection'
import TestimoniSection from './components/TestimoniSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-[#2C2C2C] text-[#E4E4E4]">
        <HeroSection />
        <CTASection />
        <FeaturedProducts />
        <TestimoniSection />
      </main>
    </>
  )
}
