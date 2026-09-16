'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

/**
 * Fires GA4 view_search_results when the catalogue page has ?q=.
 * @param {{ query: string }} props
 */
export default function CatalogSearchBeacon({ query }) {
  useEffect(() => {
    const q = query.trim()
    if (!q) return
    trackEvent('view_search_results', {
      search_term: q,
      search_location: 'catalog',
    })
  }, [query])

  return null
}
