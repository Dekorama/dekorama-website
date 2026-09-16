'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import {
  COOKIE_CONSENT_KEY,
  persistCookieConsent,
  updateAnalyticsConsent,
} from '@/lib/analytics'

export default function CookieBanner() {
  const t = useTranslations('cookieBanner')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    if (typeof window === 'undefined') return
    persistCookieConsent('accepted')
    updateAnalyticsConsent('granted')
    setVisible(false)
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'cookie_consent_accepted' })
  }

  const reject = () => {
    if (typeof window === 'undefined') return
    persistCookieConsent('rejected')
    updateAnalyticsConsent('denied')
    setVisible(false)
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'cookie_consent_rejected' })
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label={t('ariaLabel')}
      className="fixed bottom-0 left-0 right-0 z-50 bg-black text-white px-4 py-4 sm:px-6 sm:py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] animate-[slideUp_0.3s_ease-out]"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          {t('message')}{' '}
          <Link href="/cookies" className="text-white underline hover:no-underline font-medium">
            {t('policyLink')}
          </Link>
          .
        </p>
        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
          <button
            type="button"
            onClick={reject}
            className="flex-shrink-0 px-6 py-2.5 border border-white/40 text-white font-medium hover:bg-white/10 transition-colors rounded-sm"
          >
            {t('reject')}
          </button>
          <button
            type="button"
            onClick={accept}
            className="flex-shrink-0 px-6 py-2.5 bg-white text-black font-medium hover:bg-gray-100 transition-colors rounded-sm"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  )
}
