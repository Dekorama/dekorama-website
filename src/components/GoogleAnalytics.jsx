'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XDYCVSTQZG'
const STORAGE_KEY = 'dekorama-cookie-consent'

export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const enable = () => setEnabled(true)

    if (typeof window === 'undefined') return undefined

    if (localStorage.getItem(STORAGE_KEY) === 'accepted') {
      enable()
      return undefined
    }

    const onStorage = (event) => {
      if (event.key === STORAGE_KEY && event.newValue === 'accepted') enable()
    }
    const onConsent = () => enable()

    window.addEventListener('storage', onStorage)
    window.addEventListener('dekorama-cookie-consent', onConsent)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('dekorama-cookie-consent', onConsent)
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
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}
