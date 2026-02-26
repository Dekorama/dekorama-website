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

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const navLinks = [
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Blog', href: '/blog' },
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
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-[4.25rem]">
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity shrink-0"
          >
            <Image
              src="/dekorama-logo-cropped.svg"
              alt="Dekorama"
              width={160}
              height={42}
              className="h-7 sm:h-8 md:h-9 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-black transition-colors font-medium text-[15px]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contacto"
              className="px-4 py-2 text-sm font-medium bg-black text-white hover:bg-gray-800 transition-colors rounded-sm"
            >
              Visita gratuita
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 md:hidden">
            <Link
              href="/#contacto"
              className="px-3 py-1.5 text-xs sm:text-sm font-medium bg-black text-white rounded-sm hover:bg-gray-800 transition-colors"
            >
              Visita gratuita
            </Link>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 -mr-2 text-black hover:bg-gray-100 rounded-md transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay + panel */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-200 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden
        />
        <div
          className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-xl transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-16 pb-8 px-6">
            <nav className="flex flex-col gap-1" role="navigation" aria-label="Menú principal">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-3.5 px-3 text-base font-medium text-gray-800 hover:text-black hover:bg-gray-50 rounded-lg transition-colors -mx-3"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-6 border-t border-gray-200">
              <Link
                href="/#contacto"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full py-3 px-4 text-center text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Visita gratuita
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
