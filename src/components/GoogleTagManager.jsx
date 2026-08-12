'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-5HRSQRQK'
const STORAGE_KEY = 'dekorama-cookie-consent'

function scheduleIdle(fn) {
  if (typeof window === 'undefined') return () => {}
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(fn, { timeout: 4000 })
    return () => window.cancelIdleCallback(id)
  }
  const id = window.setTimeout(fn, 2500)
  return () => window.clearTimeout(id)
}

export default function GoogleTagManager() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    let cancelIdle = () => {}

    const enable = () => {
      cancelIdle()
      cancelIdle = scheduleIdle(() => setEnabled(true))
    }

    if (localStorage.getItem(STORAGE_KEY) === 'accepted') {
      enable()
      return () => cancelIdle()
    }

    const onStorage = (event) => {
      if (event.key === STORAGE_KEY && event.newValue === 'accepted') enable()
    }
    const onConsent = () => enable()

    window.addEventListener('storage', onStorage)
    window.addEventListener('dekorama-cookie-consent', onConsent)
    return () => {
      cancelIdle()
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('dekorama-cookie-consent', onConsent)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <Script
        id="gtm-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
          `.trim(),
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  )
}
