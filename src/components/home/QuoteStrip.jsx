'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { images } from '@/data/images'
import { fadeUp, viewportOptions } from '@/lib/animations'

/**
 * @param {{ variant?: 'spain' | 'caracas' }} props
 */
export default function QuoteStrip({ variant = 'spain' }) {
  const ns = variant === 'caracas' ? 'homeCaracas' : 'home'
  const t = useTranslations(ns)
  const bg = variant === 'caracas' ? images.markets.caracas : images.showroom

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 md:py-32">
      <Image src={bg} alt="" fill className="object-cover opacity-30" sizes="100vw" aria-hidden />
      <div className="absolute inset-0 bg-gray-100/80" aria-hidden />
      <motion.div
        className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={fadeUp}
      >
        <blockquote className="bg-white px-5 py-10 text-center shadow-sm sm:px-8 sm:py-12 md:px-14 md:py-16">
          <p className="font-heading text-lg leading-relaxed text-gray-800 sm:text-xl md:text-2xl md:leading-relaxed">
            “{t('quote')}”
          </p>
          <footer className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 sm:mt-8 sm:text-xs">
            {t('quoteAttr')}
          </footer>
        </blockquote>
      </motion.div>
    </section>
  )
}
