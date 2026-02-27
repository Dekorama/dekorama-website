'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'

export default function Header() {
  const t = useTranslations('nav')
  const tAria = useTranslations('aria')
  const locale = useLocale()
  const pathname = usePathname()
  // usePathname from next-intl already returns the pathname without the locale prefix
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
    { label: t('services'), href: '/#servicios' },
    { label: t('catalog'), href: '/catalogo' },
    { label: t('projects'), href: '/proyectos' },
    { label: t('blog'), href: '/blog' },
    { label: t('process'), href: '/#proceso' },
    { label: t('contact'), href: '/#contacto' },
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
                className="text-gray-600 hover:text-black focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-sm transition-colors font-medium text-[15px]"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-sm font-medium text-gray-500">
                <Link
                  href={pathname}
                  locale="es"
                  className={locale === 'es' ? 'text-black font-semibold' : 'hover:text-black transition-colors'}
                  aria-current={locale === 'es' ? 'true' : undefined}
                >
                  ES
                </Link>
                <span aria-hidden>|</span>
                <Link
                  href={pathname}
                  locale="en"
                  className={locale === 'en' ? 'text-black font-semibold' : 'hover:text-black transition-colors'}
                  aria-current={locale === 'en' ? 'true' : undefined}
                >
                  EN
                </Link>
              </span>
              <Link
                href="/#contacto"
                className="px-4 py-2 text-sm font-medium bg-black text-white hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors rounded-sm"
              >
                {t('freeVisit')}
              </Link>
            </div>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 md:hidden">
            <span className="flex items-center gap-1 text-xs sm:text-sm">
              <Link href={pathname} locale="es" className={locale === 'es' ? 'font-semibold text-black' : 'text-gray-500'}>
                ES
              </Link>
              <span>|</span>
              <Link href={pathname} locale="en" className={locale === 'en' ? 'font-semibold text-black' : 'text-gray-500'}>
                EN
              </Link>
            </span>
            <Link
              href="/#contacto"
              className="px-3 py-1.5 text-xs sm:text-sm font-medium bg-black text-white rounded-sm hover:bg-gray-800 transition-colors"
            >
              {t('freeVisit')}
            </Link>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 -mr-2 text-black hover:bg-gray-100 rounded-md transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={isMenuOpen ? tAria('closeMenu') : tAria('openMenu')}
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
                {t('freeVisit')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
