'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import MarketSwitcher from '@/components/MarketSwitcher'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import MarketContactLink from '@/components/MarketContactLink'
import MarketHomeLink from '@/components/MarketHomeLink'

export default function Header() {
  const t = useTranslations('nav')
  const tAria = useTranslations('aria')
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
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const navLinks = [
    { label: t('services'), href: '/servicios' },
    { label: t('catalog'), href: '/catalogo' },
    { label: t('projects'), href: '/proyectos' },
    { label: t('blog'), href: '/blog' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 transition-all duration-300 sm:px-5 sm:py-3 ${
          isScrolled
            ? 'border-white/15 bg-[#0a0c10]/90 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl'
            : 'border-white/10 bg-[#0a0c10]/70 backdrop-blur-md'
        }`}
      >
        <MarketHomeLink className="[&_img]:brightness-0 [&_img]:invert" />

        <nav className="hidden items-center gap-1 lg:flex lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-[15px] font-medium text-white/65 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              {link.label}
            </Link>
          ))}
          <MarketContactLink className="rounded-lg px-3 py-2 text-[15px] font-medium text-white/65 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
            {t('contact')}
          </MarketContactLink>
          <div className="ml-2 flex items-center gap-1 border-l border-white/10 pl-3">
            <MarketSwitcher tone="dark" />
            <LocaleSwitcher tone="dark" />
            <MarketContactLink className="ml-2 rounded-xl bg-[#e8eaed] px-4 py-2 text-sm font-semibold text-[#0a0c10] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
              {t('freeVisit')}
            </MarketContactLink>
          </div>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          <MarketSwitcher tone="dark" />
          <LocaleSwitcher tone="dark" />
          <MarketContactLink className="ml-1 rounded-xl bg-[#e8eaed] px-3 py-1.5 text-xs font-semibold text-[#0a0c10] transition-colors hover:bg-white sm:text-sm">
            {t('freeVisit')}
          </MarketContactLink>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-white/10"
            aria-label={isMenuOpen ? tAria('closeMenu') : tAria('openMenu')}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 transition-opacity duration-200 lg:hidden ${
          isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden
        />
        <div
          className={`absolute bottom-0 right-0 top-0 w-full max-w-sm border-l border-white/10 bg-[#0a0c10] shadow-xl transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col px-6 pb-8 pt-20">
            <nav className="flex flex-col gap-1" role="navigation" aria-label="Menú principal">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="-mx-3 rounded-xl px-3 py-3.5 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <MarketContactLink
                onClick={() => setIsMenuOpen(false)}
                className="-mx-3 rounded-xl px-3 py-3.5 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              >
                {t('contact')}
              </MarketContactLink>
            </nav>
            <div className="mt-auto space-y-4 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <MarketSwitcher align="left" tone="dark" />
                <LocaleSwitcher align="left" tone="dark" />
              </div>
              <MarketContactLink
                onClick={() => setIsMenuOpen(false)}
                className="block w-full rounded-xl bg-[#e8eaed] px-4 py-3 text-center text-sm font-semibold text-[#0a0c10] transition-colors hover:bg-white"
              >
                {t('freeVisit')}
              </MarketContactLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
