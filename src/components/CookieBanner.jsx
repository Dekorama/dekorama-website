'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'dekorama-cookie-consent'

export default function CookieBanner() {
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
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-50 bg-black text-white px-4 py-4 sm:px-6 sm:py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] animate-[slideUp_0.3s_ease-out]"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          Usamos cookies para mejorar tu experiencia. Al continuar, aceptas nuestra{' '}
          <Link href="/cookies" className="text-white underline hover:no-underline font-medium">
            política de cookies
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="flex-shrink-0 px-6 py-2.5 bg-white text-black font-medium hover:bg-gray-100 transition-colors rounded-sm"
        >
          Aceptar
        </button>
      </div>
    </div>
  )
}
