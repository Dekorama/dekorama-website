'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { images } from '@/data/images'
import MarketContactLink from '@/components/MarketContactLink'

/**
 * Full-bleed editorial hero.
 * @param {{ variant?: 'spain' | 'caracas' }} props
 */
export default function Hero({ variant = 'spain' }) {
  const isCaracas = variant === 'caracas'
  const t = useTranslations(isCaracas ? 'heroCaracas' : 'hero')
  const tHome = useTranslations(isCaracas ? 'homeCaracas' : 'home')
  const [index, setIndex] = useState(0)

  const slides = isCaracas
    ? [
        {
          image: images.markets.caracas,
          alt: 'Interior de lujo con piedra natural y vista a El Ávila, Caracas',
          title: tHome('heroSlide1Title'),
          cta: tHome('heroSlide1Cta'),
          href: '/servicios',
        },
        {
          image: images.services.cocinas,
          alt: 'Cocina a medida Caracas',
          title: tHome('heroSlide2Title'),
          cta: tHome('heroSlide2Cta'),
          href: '/cocinas-a-medida',
        },
        {
          image: images.services.banos,
          alt: 'Baño premium Caracas',
          title: tHome('heroSlide3Title'),
          cta: tHome('heroSlide3Cta'),
          href: '/proyectos',
        },
      ]
    : [
        {
          image: images.hero,
          alt: 'Interior de lujo con piedra natural y chimenea lineal',
          title: tHome('heroSlide1Title'),
          cta: tHome('heroSlide1Cta'),
          href: '/materiales',
        },
        {
          image: images.showroom,
          alt: 'Showroom Dekorama Benalmádena',
          title: tHome('heroSlide2Title'),
          cta: tHome('heroSlide2Cta'),
          href: '/contacto',
        },
        {
          image: images.heroProjects,
          alt: 'Proyecto de reforma Dekorama',
          title: tHome('heroSlide3Title'),
          cta: tHome('heroSlide3Cta'),
          href: '/proyectos',
        },
      ]

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length)
  }, [slides.length])

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    const id = setInterval(next, 7000)
    return () => clearInterval(id)
  }, [next])

  const slide = slides[index]

  return (
    <section
      id="hero"
      className="relative min-h-[22rem] h-[calc(100svh-var(--site-header-h,4.5rem))] max-h-[calc(100dvh-var(--site-header-h,4.5rem))] w-full overflow-hidden bg-black sm:min-h-[28rem]"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.image}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/25"
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 pb-14 pt-8 text-center text-white sm:px-8 sm:pb-16">
        <motion.p
          key={`eyebrow-${index}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-2 text-[10px] font-medium uppercase tracking-[0.28em] text-white/80 sm:mb-3 sm:text-[11px]"
        >
          {t('experience')}
        </motion.p>
        <motion.h1
          key={`title-${index}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="max-w-[14ch] font-heading text-[2rem] font-normal leading-[1.1] tracking-tight sm:max-w-none sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {t('title')}
        </motion.h1>
        <motion.p
          key={`sub-${index}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mt-3 max-w-sm text-sm leading-relaxed text-white/85 sm:mt-4 sm:max-w-xl sm:text-base md:text-lg"
        >
          {slide.title}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 flex w-full max-w-xs flex-col items-center gap-4 sm:mt-8 sm:max-w-none sm:flex-row sm:justify-center"
        >
          <MarketContactLink className="w-full border border-white bg-white px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-transparent hover:text-white sm:w-auto sm:px-8">
            {t('requestConsultation')}
          </MarketContactLink>
          <Link
            href={slide.href}
            className="border-b border-white pb-0.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-70"
          >
            {slide.cta}
          </Link>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={prev}
        className="absolute left-1 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center text-white/80 transition-colors hover:text-white sm:left-4 sm:flex md:left-6"
        aria-label="Previous"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-1 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center text-white/80 transition-colors hover:text-white sm:right-4 sm:flex md:right-6"
        aria-label="Next"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2 pb-[env(safe-area-inset-bottom,0px)] sm:bottom-6">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === index ? 'bg-white' : 'bg-white/40'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
