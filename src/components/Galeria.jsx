'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { images } from '@/data/images'

export default function Galeria() {
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('fade-in')) {
          entry.target.classList.add('fade-in')
        }
      })
    }, observerOptions)
    const sections = document.querySelectorAll('#proyectos section > *')
    sections.forEach((el) => observer.observe(el))
    return () => sections.forEach((el) => observer.unobserve(el))
  }, [])

  return (
    <section id="proyectos" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-bg">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-16">
          Proyectos que hablan por nosotros
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {images.gallery.map((proyecto, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[4/3]"
            >
              <Image
                src={proyecto.src}
                alt={proyecto.tipo}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300 flex items-center justify-center">
                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-xl font-semibold">{proyecto.tipo}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/proyectos"
            className="inline-block px-8 py-4 border-2 border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            Ver todos los proyectos
          </Link>
        </div>
      </div>
    </section>
  )
}
