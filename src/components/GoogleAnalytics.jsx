'use client'

/**
 * Unused — measurement runs through GoogleTagManager + Consent Mode v2.
 * Do not mount this alongside GTM (double counting).
 * Kept for reference / emergency direct gtag path only.
 */

import { useEffect, useState } from 'react'
import Script from 'next/script'
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_KEY,
  readCookieConsent,
  updateAnalyticsConsent,
} from '@/lib/analytics'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XDYCVSTQZG'

export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const sync = () => {
      const consent = readCookieConsent()
      if (consent === 'accepted') {
        updateAnalyticsConsent('granted')
        setEnabled(true)
      } else {
        updateAnalyticsConsent('denied')
        setEnabled(true)
      }
    }

    sync()

    const onStorage = (/** @type {StorageEvent} */ event) => {
      if (event.key === COOKIE_CONSENT_KEY) sync()
    }
    window.addEventListener('storage', onStorage)
    window.addEventListener(COOKIE_CONSENT_EVENT, sync)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener(COOKIE_CONSENT_EVENT, sync)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga-config" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}
