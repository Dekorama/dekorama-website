'use client'

import { useEffect, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { getCatalogDownloadName } from '@/data/catalogs'

/**
 * @typedef {import('@/data/catalogs').CatalogItem} CatalogItem
 *
 * @typedef {object} CatalogPdfViewerProps
 * @property {CatalogItem} catalog
 * @property {string} backLabel
 * @property {string} downloadLabel
 * @property {string} openLabel
 * @property {string} fallbackLabel
 * @property {string} countryLabel
 */

/**
 * Sticky toolbar + PDF embed with mobile-friendly fallbacks.
 * @param {CatalogPdfViewerProps} props
 */
export default function CatalogPdfViewer({
  catalog,
  backLabel,
  downloadLabel,
  openLabel,
  fallbackLabel,
  countryLabel,
}) {
  const [showFallback, setShowFallback] = useState(false)
  const downloadName = getCatalogDownloadName(catalog)
  const embedSrc = `${catalog.file}#view=FitH`

  useEffect(() => {
    const isIOS =
      typeof navigator !== 'undefined' &&
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !('MSStream' in window)
    if (isIOS) setShowFallback(true)
  }, [])

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/catalogo"
              className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-gray-600 underline-offset-4 hover:text-black hover:underline"
            >
              {backLabel}
            </Link>
            <span className="hidden h-4 w-px bg-gray-300 sm:block" aria-hidden="true" />
            <div className="min-w-0">
              <p className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                {countryLabel} · {catalog.brand}
              </p>
              <h1 className="truncate font-heading text-lg font-normal tracking-tight text-black sm:text-xl">
                {catalog.title}
              </h1>
            </div>
          </div>

          <div className="flex shrink-0 gap-2">
            <a
              href={catalog.file}
              download={downloadName}
              className="btn-primary inline-flex min-h-11 flex-1 items-center justify-center px-4 text-[11px] tracking-[0.14em] sm:flex-none"
            >
              {downloadLabel}
            </a>
            <a
              href={catalog.file}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex min-h-11 flex-1 items-center justify-center px-4 text-[11px] tracking-[0.14em] sm:flex-none"
            >
              {openLabel}
            </a>
          </div>
        </div>
      </header>

      <div className="relative flex-1 bg-gray-100">
        {showFallback ? (
          <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-16 text-center sm:py-24">
            <p className="mb-8 text-base leading-relaxed text-gray-600">{fallbackLabel}</p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href={catalog.file}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex min-h-12 items-center justify-center px-8"
              >
                {openLabel}
              </a>
              <a
                href={catalog.file}
                download={downloadName}
                className="btn-secondary inline-flex min-h-12 items-center justify-center px-8"
              >
                {downloadLabel}
              </a>
            </div>
          </div>
        ) : (
          <iframe
            src={embedSrc}
            title={catalog.title}
            className="h-[calc(100dvh-5.5rem)] w-full border-0 sm:h-[calc(100dvh-4.5rem)]"
            onError={() => setShowFallback(true)}
          />
        )}
      </div>
    </div>
  )
}
