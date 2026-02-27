'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const STORAGE_KEY = 'dekorama-cookie-consent'

export default function CookieBanner() {
  const t = useTranslations('cookieBanner')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, 'accepted')
      setVisible(false)
      // Envía evento a GTM para activar Analytics u otros tags solo con consentimiento
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'cookie_consent_accepted' })
      }
    }
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
        <button
          type="button"
          onClick={accept}
          className="flex-shrink-0 px-6 py-2.5 bg-white text-black font-medium hover:bg-gray-100 transition-colors rounded-sm"
        >
          {t('accept')}
        </button>
      </div>
    </div>
  )
}
