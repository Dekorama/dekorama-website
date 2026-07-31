'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslations } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import MarketSwitcher from '@/components/MarketSwitcher'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import MarketContactLink from '@/components/MarketContactLink'
import MarketHomeLink from '@/components/MarketHomeLink'
import MegaMenu from '@/components/MegaMenu'
import { megaNavItems } from '@/data/megaNav'
import { markets } from '@/lib/markets'
import { useActiveMarket } from '@/lib/useActiveMarket'

export default function Header() {
  const t = useTranslations('nav')
  const tMega = useTranslations('megaNav')
  const tAria = useTranslations('aria')
  const router = useRouter()
  const pathname = usePathname()
  const marketId = useActiveMarket()
  const market = marketId === 'venezuela' ? markets.venezuela : markets.spain
  const [activeMenu, setActiveMenu] = useState(/** @type {string | null} */ (null))
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(/** @type {string | null} */ (null))
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)
  const headerRef = useRef(/** @type {HTMLElement | null} */ (null))
  const menuButtonRef = useRef(/** @type {HTMLButtonElement | null} */ (null))
  const drawerRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const searchId = useId()
  const mobileSearchId = useId()
  const closeTimer = useRef(/** @type {ReturnType<typeof setTimeout> | null} */ (null))

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const el = headerRef.current
    if (!el) return

    const setHeaderHeight = () => {
      document.documentElement.style.setProperty('--site-header-h', `${el.offsetHeight}px`)
    }

    setHeaderHeight()
    const ro = new ResizeObserver(setHeaderHeight)
    ro.observe(el)
    window.addEventListener('resize', setHeaderHeight)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', setHeaderHeight)
    }
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
    setActiveMenu(null)
    setMobileExpanded(null)
  }, [pathname])

  useEffect(() => {
    if (isMobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  useEffect(() => {
    if (!isMobileOpen) return

    const getFocusables = () => {
      const nodes = drawerRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      return Array.from(nodes ?? []).filter(
        (node) => node instanceof HTMLElement && !node.hasAttribute('disabled'),
      )
    }

    const first = getFocusables()[0]
    if (first) first.focus()

    const onKeyDown = (/** @type {KeyboardEvent} */ e) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false)
        menuButtonRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return

      const list = getFocusables()
      if (!list.length) return

      const firstEl = list[0]
      const lastEl = list[list.length - 1]
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault()
        lastEl.focus()
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault()
        firstEl.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isMobileOpen])

  useEffect(() => {
    const onKeyDown = (/** @type {KeyboardEvent} */ e) => {
      if (e.key === 'Escape') setActiveMenu(null)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const openMenu = (id) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveMenu(id)
  }

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120)
  }

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  const closeMobile = () => {
    setIsMobileOpen(false)
    setMobileExpanded(null)
  }

  const handleSearch = (/** @type {import('react').FormEvent} */ e) => {
    e.preventDefault()
    const q = searchQuery.trim()
    closeMobile()
    router.push(q ? `/catalogo?q=${encodeURIComponent(q)}` : '/catalogo')
  }

  const activeItem = megaNavItems.find((item) => item.id === activeMenu) ?? null

  const mobileDrawer =
    mounted &&
    createPortal(
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${
          isMobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!isMobileOpen}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isMobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMobile}
          aria-hidden
        />
        <div
          ref={drawerRef}
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={tAria('menu')}
          className={`absolute inset-y-0 right-0 flex w-full max-w-[100vw] flex-col bg-white shadow-xl transition-transform duration-300 ease-out sm:max-w-sm ${
            isMobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            paddingTop: 'env(safe-area-inset-top, 0px)',
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          }}
        >
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-100 px-4 py-3 sm:px-5">
            <MarketHomeLink className="[&_img]:h-7" />
            <button
              type="button"
              onClick={closeMobile}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center text-gray-900"
              aria-label={tAria('closeMenu')}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="shrink-0 border-b border-gray-100 px-4 py-3 sm:px-5">
            <form onSubmit={handleSearch} className="relative">
              <label htmlFor={mobileSearchId} className="sr-only">
                {t('search')}
              </label>
              <input
                id={mobileSearchId}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search')}
                className="w-full border-0 border-b border-gray-300 bg-transparent py-2.5 pr-10 font-heading text-base text-gray-700 placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center text-gray-500"
                aria-label={t('search')}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                  />
                </svg>
              </button>
            </form>
          </div>

          <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-2 sm:px-5" aria-label="Mobile">
            {megaNavItems.map((item) => {
              const expanded = mobileExpanded === item.id
              return (
                <div key={item.id} className="border-b border-gray-100">
                  <button
                    type="button"
                    className="flex min-h-[52px] w-full items-center justify-between gap-3 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.18em] text-gray-900"
                    onClick={() => setMobileExpanded(expanded ? null : item.id)}
                    aria-expanded={expanded}
                  >
                    {tMega(item.labelKey)}
                    <svg
                      className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${
                        expanded ? 'rotate-45' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                  {expanded ? (
                    <div className="space-y-5 pb-5 pl-0.5">
                      {item.columns.map((col) => (
                        <div key={col.titleKey || col.links[0]?.href}>
                          {col.titleKey ? (
                            <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                              {tMega(col.titleKey)}
                            </p>
                          ) : null}
                          <ul className="space-y-0.5">
                            {col.links.map((link) => (
                              <li key={link.href + link.labelKey}>
                                <Link
                                  href={link.href}
                                  onClick={closeMobile}
                                  className="flex min-h-[44px] items-center text-[15px] text-gray-600 transition-colors hover:text-black"
                                >
                                  {tMega(link.labelKey)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {item.featured ? (
                        <Link
                          href={item.featured.href}
                          onClick={closeMobile}
                          className="inline-flex min-h-[44px] items-center text-xs font-semibold uppercase tracking-[0.18em] text-black underline underline-offset-4"
                        >
                          {tMega(item.featured.labelKey)}
                        </Link>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              )
            })}

            <div className="space-y-0.5 border-b border-gray-100 py-2">
              <Link
                href="/catalogo"
                onClick={closeMobile}
                className="flex min-h-[48px] items-center text-xs font-semibold uppercase tracking-[0.18em] text-gray-900"
              >
                {t('catalog')}
              </Link>
              <Link
                href="/partners"
                onClick={closeMobile}
                className="flex min-h-[48px] items-center text-xs font-semibold uppercase tracking-[0.18em] text-gray-900"
              >
                {t('partners')}
              </Link>
              <MarketContactLink
                onClick={closeMobile}
                className="flex min-h-[48px] items-center text-xs font-semibold uppercase tracking-[0.18em] text-gray-900"
              >
                {t('contact')}
              </MarketContactLink>
            </div>
          </nav>

          <div className="shrink-0 space-y-4 border-t border-gray-100 px-4 py-5 sm:px-5">
            {(market.phoneReady || market.email) && (
              <div className="text-sm text-gray-600">
                {market.phoneReady ? (
                  <a href={`tel:${market.telephone}`} className="font-medium text-gray-900 hover:underline">
                    {t('call')}: {market.phoneDisplay}
                  </a>
                ) : (
                  <a href={`mailto:${market.email}`} className="font-medium text-gray-900 hover:underline">
                    {market.email}
                  </a>
                )}
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <MarketSwitcher align="left" tone="light" />
              <LocaleSwitcher align="left" tone="light" />
            </div>
            <MarketContactLink
              onClick={closeMobile}
              className="btn-primary flex w-full min-h-[48px] items-center justify-center text-center"
            >
              {t('freeVisit')}
            </MarketContactLink>
          </div>
        </div>
      </div>,
      document.body,
    )

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-gray-200 bg-white"
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
    >
      {/* Utility + logo tier */}
      <div className="border-b border-gray-100 lg:border-b">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-2 px-4 py-2.5 sm:gap-3 sm:px-6 sm:py-3 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
          {/* Left utilities — desktop only */}
          <div className="hidden min-w-0 items-center gap-2 text-[11px] text-gray-600 lg:flex">
            {market.phoneReady ? (
              <a href={`tel:${market.telephone}`} className="utility-link truncate">
                {t('call')}: {market.phoneDisplay}
              </a>
            ) : (
              <span className="utility-link truncate">{market.email}</span>
            )}
            <span className="text-gray-300" aria-hidden>
              /
            </span>
            <MarketContactLink className="utility-link shrink-0">{t('aboutShowroom')}</MarketContactLink>
          </div>

          {/* Logo — left on mobile, centered on desktop */}
          <div className="min-w-0 justify-self-start lg:justify-self-center">
            <MarketHomeLink className="[&_img]:h-7 sm:[&_img]:h-8 md:[&_img]:h-9 lg:[&_img]:h-10" />
          </div>

          {/* Right controls */}
          <div className="flex items-center justify-end gap-0.5 sm:gap-1">
            <Link href="/partners" className="utility-link hidden xl:inline">
              {t('partners')}
            </Link>
            <span className="hidden text-gray-300 xl:inline" aria-hidden>
              /
            </span>
            <MarketContactLink className="utility-link hidden xl:inline">{t('contact')}</MarketContactLink>
            <div className="ml-0 hidden items-center gap-0.5 border-l border-gray-200 pl-2 lg:ml-2 lg:flex lg:pl-3">
              <MarketSwitcher tone="light" />
              <LocaleSwitcher tone="light" />
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center text-gray-900 lg:hidden"
              onClick={() => setIsMobileOpen((v) => !v)}
              aria-label={isMobileOpen ? tAria('closeMenu') : tAria('openMenu')}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-nav-drawer"
            >
              {isMobileOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main nav tier — desktop */}
      <div className="relative hidden lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3.5 xl:gap-8 lg:px-8">
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 xl:gap-x-9" aria-label="Main">
            {megaNavItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`nav-link ${activeMenu === item.id ? 'opacity-55' : ''}`}
                onMouseEnter={() => openMenu(item.id)}
                onFocus={() => openMenu(item.id)}
                aria-expanded={activeMenu === item.id}
                aria-haspopup="true"
              >
                {tMega(item.labelKey)}
              </button>
            ))}
          </nav>

          <form onSubmit={handleSearch} className="relative w-40 shrink-0 xl:w-56">
            <label htmlFor={searchId} className="sr-only">
              {t('search')}
            </label>
            <input
              id={searchId}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search')}
              className="w-full border-0 border-b border-gray-300 bg-transparent py-1.5 pr-8 font-heading text-sm text-gray-700 placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-0"
            />
            <button
              type="submit"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              aria-label={t('search')}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                />
              </svg>
            </button>
          </form>
        </div>

        {activeItem ? (
          <MegaMenu item={activeItem} open onClose={() => setActiveMenu(null)} />
        ) : null}
      </div>

      {mobileDrawer}
    </header>
  )
}
