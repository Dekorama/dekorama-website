'use client'

import { useEffect, useState } from 'react'
import { usePathname } from '@/i18n/navigation'
import {
  getStoredMarket,
  isMarketId,
} from '@/lib/marketPreference'
import {
  marketContactHref,
  marketHomeHref,
} from '@/lib/materialRoutes'

export { marketContactHref, marketHomeHref }

const VE_PATHS = [
  '/reformas-caracas',
  '/contacto-caracas',
  '/materiales-caracas',
  '/materiales-premium-caracas',
]

/**
 * @param {string} pathname
 * @returns {boolean}
 */
export function isVenezuelaPath(pathname) {
  return VE_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))
}

/**
 * Active market from route + localStorage preference.
 * @returns {'spain' | 'venezuela'}
 */
export function useActiveMarket() {
  const pathname = usePathname()
  const [market, setMarket] = useState(/** @type {'spain' | 'venezuela'} */ ('spain'))

  useEffect(() => {
    const sync = () => {
      if (isVenezuelaPath(pathname)) {
        setMarket('venezuela')
        return
      }
      setMarket(getStoredMarket() ?? 'spain')
    }
    sync()
    const onChange = (/** @type {Event} */ event) => {
      const detail = /** @type {CustomEvent} */ (event).detail
      if (isVenezuelaPath(pathname)) {
        setMarket('venezuela')
        return
      }
      if (isMarketId(detail)) setMarket(detail)
      else sync()
    }
    window.addEventListener('dekorama-market-change', onChange)
    return () => window.removeEventListener('dekorama-market-change', onChange)
  }, [pathname])

  return market
}

