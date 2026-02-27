'use client'

import { useEffect } from 'react'

export default function SetHtmlLang({ locale }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [locale])
  return null
}
