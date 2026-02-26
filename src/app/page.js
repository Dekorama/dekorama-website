'use client'

import { useEffect } from 'react'
import Hero from '@/components/Hero'
import Beneficios from '@/components/Beneficios'
import Servicios from '@/components/Servicios'
import Galeria from '@/components/Galeria'
import Proceso from '@/components/Proceso'
import Testimonios from '@/components/Testimonios'
import CTAFinal from '@/components/CTAFinal'

export default function Home() {
  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : ''
    if (hash) {
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('fade-in')) {
          entry.target.classList.add('fade-in')
        }
      })
    }, observerOptions)
    const sections = document.querySelectorAll('section')
    const children = document.querySelectorAll('section > *')
    ;[...sections, ...children].forEach((el) => observer.observe(el))
    return () => [...sections, ...children].forEach((el) => observer.unobserve(el))
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Beneficios />
      <Servicios />
      <Galeria />
      <Proceso />
      <Testimonios />
      <CTAFinal />
    </div>
  )
}
