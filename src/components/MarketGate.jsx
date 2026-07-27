'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { getStoredMarket, setStoredMarket } from '@/lib/marketPreference'
import { detectMarket } from '@/lib/detectMarket'
import { images } from '@/data/images'
import SideRays from '@/components/SideRays'
import ProfileCard from '@/components/ProfileCard'
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
  const [enableTilt, setEnableTilt] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 768px)')
    const sync = () => setEnableTilt(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

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

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="market-gate"
          role="dialog"
          aria-modal="true"
          aria-label={t('ariaLabel')}
          className="fixed inset-0 z-[100] overflow-hidden text-white"
          style={{
            background:
              'radial-gradient(ellipse 90% 60% at 70% 0%, #12161c 0%, #050505 42%, #030303 100%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: leaving ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
            <SideRays
              speed={1.2}
              rayColor1="#f4f7fb"
              rayColor2="#96c8ff"
              intensity={1.65}
              spread={1.35}
              origin="top-right"
              tilt={-4}
              saturation={0.85}
              blend={0.62}
              falloff={1.75}
              opacity={0.95}
            />
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-[2]"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 70%, rgba(5,5,5,0.35), transparent 70%), linear-gradient(180deg, rgba(5,5,5,0.15) 0%, rgba(5,5,5,0.55) 100%)',
            }}
            aria-hidden
          />

          <div className="relative z-10 flex h-[100dvh] max-h-[100dvh] flex-col">
            <motion.header
              className="mx-auto mt-[max(0.75rem,env(safe-area-inset-top))] flex w-[min(94%,72rem)] shrink-0 items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 backdrop-blur-md sm:mt-5 sm:rounded-2xl sm:px-5 sm:py-3"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Image
                src="/dekorama-logo-cropped.svg"
                alt="Dekorama"
                width={148}
                height={40}
                className="h-6 w-auto object-contain brightness-0 invert sm:h-8"
                priority
              />
              <div className="flex items-center gap-2 sm:gap-4">
                <p className="hidden text-sm text-white/55 sm:block">{t('navHint')}</p>
                <LocaleSwitcher tone="dark" />
              </div>
            </motion.header>

            <div className="flex min-h-0 flex-1 flex-col items-center justify-start overflow-y-auto overscroll-contain px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 text-center sm:justify-center sm:px-6 sm:pb-8 sm:pt-6">
              <motion.h1
                className="max-w-3xl font-heading text-[1.65rem] leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
              >
                {t('headline')}
              </motion.h1>

              <motion.p
                className="mt-2 max-w-md text-[0.8125rem] leading-relaxed text-white/60 sm:mt-4 sm:max-w-xl sm:text-base"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.14 }}
              >
                {t('subheadline')}
              </motion.p>

              <motion.div
                className="mt-5 grid w-full max-w-3xl grid-cols-1 justify-items-center gap-4 sm:mt-8 sm:gap-6 md:mt-10 md:grid-cols-2 md:items-stretch md:gap-8"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ProfileCard
                  className="pc-market"
                  name={t('spainLabel')}
                  title={t('spainDetail')}
                  handle="espana"
                  status={t('spainStatus')}
                  contactText={t('spainCta')}
                  avatarUrl={images.hero}
                  miniAvatarUrl="/dekorama-favicon.png"
                  showUserInfo
                  enableTilt={enableTilt}
                  enableMobileTilt={false}
                  behindGlowEnabled={enableTilt}
                  behindGlowColor="rgba(234, 200, 140, 0.35)"
                  behindGlowSize="55%"
                  onContactClick={() => choose('spain')}
                />
                <ProfileCard
                  className="pc-market"
                  name={t('venezuelaLabel')}
                  title={t('venezuelaDetail')}
                  handle="caracas"
                  status={t('venezuelaStatus')}
                  contactText={t('venezuelaCta')}
                  avatarUrl={images.markets.caracas}
                  miniAvatarUrl="/dekorama-favicon.png"
                  showUserInfo
                  enableTilt={enableTilt}
                  enableMobileTilt={false}
                  behindGlowEnabled={enableTilt}
                  behindGlowColor="rgba(125, 190, 255, 0.4)"
                  behindGlowSize="55%"
                  onContactClick={() => choose('venezuela')}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
