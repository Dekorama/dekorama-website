'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Proceso', href: '/#proceso' },
    { label: 'Contacto', href: '/#contacto' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity shrink-0"
          >
            <Image
              src="/dekorama-logo-cropped.svg"
              alt="Dekorama"
              width={200}
              height={52}
              className="h-11 md:h-12 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-black transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contacto"
              className="px-6 py-2.5 bg-black text-white font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105"
            >
              Consulta gratuita
            </Link>
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <Link
              href="/#contacto"
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded"
            >
              Consulta gratuita
            </Link>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-black"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden
          />
          <div className="fixed top-20 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden py-6 px-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-gray-700 hover:text-black py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contacto"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 px-6 py-3 bg-black text-white font-medium text-center hover:bg-gray-800"
              >
                Consulta gratuita
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
