'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_KEY,
  ensureDataLayer,
  readCookieConsent,
  updateAnalyticsConsent,
} from '@/lib/analytics'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-5HRSQRQK'

function scheduleIdle(fn) {
  if (typeof window === 'undefined') return () => {}
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(fn, { timeout: 4000 })
    return () => window.cancelIdleCallback(id)
  }
  const id = window.setTimeout(fn, 2500)
  return () => window.clearTimeout(id)
}

/**
 * Consent Mode v2 defaults (denied) before GTM, then load GTM always.
 * Accepted → analytics_storage granted. Rejected / no choice → denied (cookieless).
 */
export default function GoogleTagManager() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    ensureDataLayer()
    const consent = readCookieConsent()
    if (consent === 'accepted') {
      updateAnalyticsConsent('granted')
    } else if (consent === 'rejected') {
      updateAnalyticsConsent('denied')
    }

    let cancelIdle = scheduleIdle(() => setEnabled(true))

    const onStorage = (/** @type {StorageEvent} */ event) => {
      if (event.key !== COOKIE_CONSENT_KEY) return
      if (event.newValue === 'accepted') updateAnalyticsConsent('granted')
      else if (event.newValue === 'rejected') updateAnalyticsConsent('denied')
    }
    const onConsent = () => {
      const next = readCookieConsent()
      if (next === 'accepted') updateAnalyticsConsent('granted')
      else if (next === 'rejected') updateAnalyticsConsent('denied')
    }

    window.addEventListener('storage', onStorage)
    window.addEventListener(COOKIE_CONSENT_EVENT, onConsent)
    return () => {
      cancelIdle()
      window.removeEventListener('storage', onStorage)
      window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent)
    }
  }, [])

  return (
    <>
      <Script
        id="gtm-consent-default"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
try {
  var c = localStorage.getItem('${COOKIE_CONSENT_KEY}');
  if (c === 'accepted') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }
} catch (e) {}
          `.trim(),
        }}
      />
      {enabled ? (
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
      ) : null}
    </>
  )
}
