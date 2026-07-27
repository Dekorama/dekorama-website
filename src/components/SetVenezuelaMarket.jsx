'use client'

import { useEffect } from 'react'
import { setStoredMarket } from '@/lib/marketPreference'

/** Marks Venezuela market when landing on Caracas routes. */
export default function SetVenezuelaMarket() {
  useEffect(() => {
    setStoredMarket('venezuela')
  }, [])
  return null
}
