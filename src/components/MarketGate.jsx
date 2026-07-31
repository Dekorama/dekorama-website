'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { getStoredMarket, setStoredMarket } from '@/lib/marketPreference'
import { detectMarket } from '@/lib/detectMarket'
import { images } from '@/data/images'
import LocaleSwitcher from '@/components/LocaleSwitcher'

/**
 * Full-viewport market gate on home only.
 * Client-only overlay — Spain SSR/crawl HTML untouched.
 * Auto-skips when IP/timezone maps to ES or VE.
 */
export default function MarketGate() {
  const t = useTranslations('marketGate')
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [leaving, setLeaving] = useState(/** @type {null | 'spain' | 'venezuela'} */ (null))

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      if (pathname === '/reformas-caracas') {
        setStoredMarket('venezuela')
        if (!cancelled) setOpen(false)
        return
      }

      if (pathname !== '/') {
        if (!cancelled) setOpen(false)
        return
      }

      const stored = getStoredMarket()
      if (stored) {
        if (!cancelled) setOpen(false)
        return
      }

      const detected = await detectMarket()
      if (cancelled) return

      if (detected === 'spain') {
        setStoredMarket('spain')
        setOpen(false)
        return
      }

      if (detected === 'venezuela') {
        setStoredMarket('venezuela')
        setOpen(false)
        router.replace('/reformas-caracas')
        return
      }

      setOpen(true)
    }

    run()
    return () => {
      cancelled = true
    }
  }, [pathname, router])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  /**
   * @param {'spain' | 'venezuela'} marketId
   */
  const choose = (marketId) => {
    setLeaving(marketId)
    setStoredMarket(marketId)
    window.setTimeout(() => {
      setOpen(false)
      setLeaving(null)
      if (marketId === 'venezuela') {
        router.push('/reformas-caracas')
      }
    }, 420)
  }

  const markets = [
    {
      id: /** @type {const} */ ('spain'),
      label: t('spainLabel'),
      detail: t('spainDetail'),
      status: t('spainStatus'),
      cta: t('spainCta'),
      image: images.hero,
      alt: t('spainImageAlt'),
    },
    {
      id: /** @type {const} */ ('venezuela'),
      label: t('venezuelaLabel'),
      detail: t('venezuelaDetail'),
      status: t('venezuelaStatus'),
      cta: t('venezuelaCta'),
      image: images.markets.caracas,
      alt: t('venezuelaImageAlt'),
    },
  ]

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="market-gate"
          role="dialog"
          aria-modal="true"
          aria-label={t('ariaLabel')}
          className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-white text-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: leaving ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <motion.header
            className="relative z-20 flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-3.5 sm:px-8 sm:py-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <Image
              src="/dekorama-logo-cropped.svg"
              alt="Dekorama"
              width={160}
              height={42}
              className="h-7 w-auto object-contain sm:h-8 md:h-9"
              priority
            />
            <div className="flex items-center gap-3 sm:gap-5">
              <p className="hidden text-[11px] uppercase tracking-[0.18em] text-gray-500 sm:block">
                {t('navHint')}
              </p>
              <LocaleSwitcher tone="light" />
            </div>
          </motion.header>

          <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
            <motion.div
              className="shrink-0 px-5 pb-6 pt-8 text-center sm:px-8 sm:pb-8 sm:pt-12"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
            >
              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.28em] text-gray-500 sm:mb-3 sm:text-[11px]">
                {t('badgeText')}
              </p>
              <h1 className="font-heading text-[1.85rem] font-normal leading-[1.1] tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl">
                {t('headline')}
              </h1>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-600 sm:mt-4 sm:max-w-xl sm:text-base">
                {t('subheadline')}
              </p>
            </motion.div>

            <div className="grid min-h-0 flex-1 auto-rows-fr grid-cols-1 md:grid-cols-2">
              {markets.map((market, i) => {
                const isDimmed = Boolean(leaving && leaving !== market.id)

                return (
                  <motion.button
                    key={market.id}
                    type="button"
                    onClick={() => choose(market.id)}
                    disabled={Boolean(leaving)}
                    className="group relative flex min-h-[42svh] flex-col items-center justify-center overflow-hidden text-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white md:min-h-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isDimmed ? 0.35 : 1 }}
                    transition={{ duration: 0.45, delay: 0.12 + i * 0.08 }}
                    aria-label={`${market.label} — ${market.cta}`}
                  >
                    <Image
                      src={market.image}
                      alt={market.alt}
                      fill
                      priority
                      className="object-cover transition-[filter] duration-500 group-hover:brightness-90"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div
                      className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/50"
                      aria-hidden
                    />
                    <div className="relative z-10 flex flex-col items-center px-5 py-10 sm:px-8 sm:py-14">
                      <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/80 sm:text-[11px]">
                        {market.status}
                      </span>
                      <span className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl md:text-5xl">
                        {market.label}
                      </span>
                      <span className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/85 sm:text-xs">
                        {market.detail}
                      </span>
                      <span className="mt-6 border border-white bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition-colors duration-300 group-hover:bg-transparent group-hover:text-white sm:mt-8 sm:px-8 sm:py-3.5 sm:text-xs">
                        {market.cta}
                      </span>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
