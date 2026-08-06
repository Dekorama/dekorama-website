'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/i18n/navigation'
import { getSearchEntries, searchSite } from '@/lib/siteSearch'
import { useActiveMarket } from '@/lib/useActiveMarket'
import { resolveMaterialHref, marketCatalogHref } from '@/lib/materialRoutes'

const DEBOUNCE_MS = 150
const MAX_RESULTS = 8

/**
 * @param {{
 *   className?: string
 *   inputClassName?: string
 *   onNavigate?: () => void
 *   onOpen?: () => void
 * }} props
 */
export default function NavSearch({ className = '', inputClassName = '', onNavigate, onOpen }) {
  const t = useTranslations('nav')
  const tMega = useTranslations('megaNav')
  const router = useRouter()
  const market = useActiveMarket()
  const inputId = useId()
  const listId = useId()
  const rootRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const [query, setQuery] = useState('')
  const [debounced, setDebounced] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const entries = useMemo(() => getSearchEntries(), [])

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(query), DEBOUNCE_MS)
    return () => window.clearTimeout(timer)
  }, [query])

  const results = useMemo(() => {
    const raw = searchSite(entries, (key) => tMega(key), debounced, MAX_RESULTS)
    return raw.map((item) => ({
      ...item,
      href: resolveMaterialHref(item.href, market),
    }))
  }, [entries, debounced, tMega, market])

  const catalogHref = marketCatalogHref(market)

  useEffect(() => {
    setActiveIndex(results.length ? 0 : -1)
  }, [results])

  useEffect(() => {
    const onPointerDown = (/** @type {MouseEvent} */ e) => {
      if (!rootRef.current?.contains(/** @type {Node} */ (e.target))) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  const go = (/** @type {string} */ href) => {
    setOpen(false)
    setQuery('')
    setDebounced('')
    onNavigate?.()
    router.push(href)
  }

  const handleSubmit = (/** @type {import('react').FormEvent} */ e) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) {
      go(catalogHref)
      return
    }
    if (activeIndex >= 0 && results[activeIndex]) {
      go(results[activeIndex].href)
      return
    }
    if (results[0]) {
      go(results[0].href)
      return
    }
    go(`${catalogHref}${catalogHref.includes('?') ? '&' : '?'}q=${encodeURIComponent(q)}`)
  }

  const onKeyDown = (/** @type {import('react').KeyboardEvent<HTMLInputElement>} */ e) => {
    if (e.key === 'Escape') {
      setOpen(false)
      setActiveIndex(-1)
      return
    }
    if (!open || !results.length) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => (i <= 0 ? results.length - 1 : i - 1))
    }
  }

  const showPanel = open && debounced.trim().length > 0

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative" role="search">
        <label htmlFor={inputId} className="sr-only">
          {t('search')}
        </label>
        <input
          id={inputId}
          type="search"
          value={query}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={showPanel}
          aria-activedescendant={
            activeIndex >= 0 && results[activeIndex] ? `${listId}-option-${activeIndex}` : undefined
          }
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            onOpen?.()
          }}
          onFocus={() => {
            setOpen(true)
            onOpen?.()
          }}
          onKeyDown={onKeyDown}
          placeholder={t('search')}
          className={
            inputClassName ||
            'w-full border-0 border-b border-gray-300 bg-transparent py-1.5 pr-8 font-heading text-sm text-gray-700 placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-0'
          }
        />
        <button
          type="submit"
          className="absolute right-0 top-1/2 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center text-gray-500 hover:text-black lg:min-h-0 lg:min-w-0"
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

      {showPanel ? (
        <div
          id={listId}
          role="listbox"
          aria-label={t('searchResults')}
          className="absolute left-0 right-0 top-full z-[70] mt-2 max-h-72 overflow-y-auto border border-gray-200 bg-white shadow-lg"
        >
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-gray-500">{t('searchNoResults')}</p>
          ) : (
            <ul>
              {results.map((result, index) => {
                const active = index === activeIndex
                return (
                  <li key={result.href + result.label} role="option" aria-selected={active}>
                    <Link
                      id={`${listId}-option-${index}`}
                      href={result.href}
                      onClick={() => {
                        setOpen(false)
                        setQuery('')
                        onNavigate?.()
                      }}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`flex min-h-[44px] flex-col justify-center px-4 py-2.5 transition-colors ${
                        active ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-sm text-gray-900">{result.label}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                        {result.group}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
          {query.trim() ? (
            <Link
              href={`${catalogHref}${catalogHref.includes('?') ? '&' : '?'}q=${encodeURIComponent(query.trim())}`}
              onClick={() => {
                setOpen(false)
                onNavigate?.()
              }}
              className="block border-t border-gray-100 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-gray-700 hover:bg-gray-50 hover:text-black"
            >
              {t('searchViewAll', { query: query.trim() })}
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
