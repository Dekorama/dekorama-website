'use client'

import { useEffect } from 'react'
import Hero from '@/components/Hero'
import FeaturedSpaces from '@/components/home/FeaturedSpaces'
import QuoteStrip from '@/components/home/QuoteStrip'
import TwoColShowroom from '@/components/home/TwoColShowroom'
import FeaturedMaterial from '@/components/home/FeaturedMaterial'
import DualLandscape from '@/components/home/DualLandscape'
import Proceso from '@/components/Proceso'
import CTAFinal from '@/components/CTAFinal'

export default function Home() {
  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : ''
    if (hash) {
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <FeaturedSpaces />
      <QuoteStrip />
      <TwoColShowroom />
      <FeaturedMaterial />
      <DualLandscape />
      <Proceso />
      <CTAFinal />
    </div>
  )
}
