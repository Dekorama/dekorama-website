'use client'

import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { images } from '@/data/images'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { heroText, fadeIn, viewportOptions } from '@/lib/animations'
import LightRays from '@/components/LightRays'

/**
 * Full-viewport dark hero with LightRays + image on the right.
 * @param {{
 *   eyebrow?: string
 *   title?: string
 *   subtitle?: string
 *   image?: string
 *   imageAlt?: string
 *   primaryHref?: string
 *   secondaryHref?: string
 *   primaryLabel?: string
 *   secondaryLabel?: string
 * }} props
 */
export default function Hero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  primaryHref = '/contacto',
  secondaryHref = '/proyectos',
  primaryLabel,
  secondaryLabel,
}) {
  const t = useTranslations('hero')

  const eyebrowText = eyebrow ?? t('experience')
  const titleText = title ?? t('title')
  const subtitleText = subtitle ?? t('subtitle')
  const primaryText = primaryLabel ?? t('requestConsultation')
  const secondaryText = secondaryLabel ?? t('viewProjects')
  const heroImage = image ?? images.hero
  const alt =
    imageAlt ??
    'Villa de lujo reformada en la Costa del Sol - Benalmádena, Marbella, Málaga'

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[#05070a] text-white"
    >
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        <LightRays
          raysOrigin="top-center"
          raysColor="#e8eaed"
          raysSpeed={1.2}
          lightSpread={0.75}
          rayLength={1.35}
          followMouse
          mouseInfluence={0.08}
          noiseAmount={0.05}
          distortion={0.03}
          fadeDistance={1.1}
          saturation={0.85}
          className="custom-rays"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,234,237,0.08), transparent 55%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 pb-20 pt-28 sm:px-6 md:pb-24 md:pt-32 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="space-y-6 md:space-y-8">
            <motion.p
              className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 sm:text-sm"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              variants={heroText}
            >
              {eyebrowText}
            </motion.p>

            <motion.h1
              className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              variants={heroText}
              transition={{ delay: 0.1 }}
            >
              {titleText}
            </motion.h1>

            <motion.p
              className="max-w-xl text-lg leading-relaxed text-white/65 md:text-xl"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              variants={heroText}
              transition={{ delay: 0.2 }}
            >
              {subtitleText}
            </motion.p>

            <motion.div
              className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              variants={heroText}
              transition={{ delay: 0.3 }}
            >
              <Link
                href={primaryHref}
                className="inline-flex min-w-[10rem] items-center justify-center rounded-xl bg-[#e8eaed] px-7 py-3.5 text-center text-sm font-semibold text-[#0a0c10] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                {primaryText}
              </Link>
              <Link
                href={secondaryHref}
                className="inline-flex min-w-[10rem] items-center justify-center rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-center text-sm font-semibold text-white/85 transition-colors hover:border-white/35 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                {secondaryText}
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="relative h-72 overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.4)] sm:h-96 md:h-[min(520px,58vh)]"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeIn}
            transition={{ delay: 0.25 }}
          >
            <Image
              src={heroImage}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
