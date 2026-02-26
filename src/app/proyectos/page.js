'use client'

import Link from 'next/link'
import Image from 'next/image'
import { images } from '@/data/images'

export default function ProyectosPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Link href="/" className="text-gray-600 hover:text-black transition-colors inline-flex items-center gap-2 mb-8">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver al inicio
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-black">
              Proyectos que hablan por nosotros
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.gallery.map((proyecto, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg aspect-[4/3]"
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
          <div className="text-center mt-12">
            <Link
              href="/#contacto"
              className="inline-block px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105"
            >
              Solicitar consulta
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
