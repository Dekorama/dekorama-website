'use client'

import Image from 'next/image'
import Link from 'next/link'
import Breadcrumb, { generateBreadcrumbSchema } from './Breadcrumb'
import { motion } from 'framer-motion'
import { fadeUp, heroText, viewportOptions } from '@/lib/animations'

/**
 * Unified page header — editorial luxury chrome.
 */
export default function PageHeader({
  breadcrumbItems = [],
  title,
  subtitle,
  heroImage,
  heroImageAlt = '',
  ctaPrimary,
  ctaSecondary,
  centered = false,
  baseUrl = 'https://www.dekoramagroup.com',
  className = '',
}) {
  const structuredData =
    breadcrumbItems.length > 0 ? generateBreadcrumbSchema(breadcrumbItems, baseUrl) : null

  if (centered || !heroImage) {
    return (
      <section className={`section-header ${className}`}>
        <div className="mx-auto max-w-7xl">
          {breadcrumbItems.length > 0 ? (
            <Breadcrumb items={breadcrumbItems} structuredData={structuredData} />
          ) : null}

          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              className="mb-5 font-heading text-3xl font-normal tracking-tight text-black sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              variants={heroText}
            >
              {title}
            </motion.h1>

            {subtitle ? (
              <motion.p
                className="mb-10 text-lg leading-relaxed text-gray-600 md:text-xl"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                variants={heroText}
                transition={{ delay: 0.1 }}
              >
                {subtitle}
              </motion.p>
            ) : null}

            {(ctaPrimary || ctaSecondary) && (
              <motion.div
                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                variants={heroText}
                transition={{ delay: 0.2 }}
              >
                {ctaPrimary ? (
                  <Link href={ctaPrimary.href} className="btn-primary">
                    {ctaPrimary.text}
                  </Link>
                ) : null}
                {ctaSecondary ? (
                  <Link href={ctaSecondary.href} className="btn-discover">
                    {ctaSecondary.text}
                  </Link>
                ) : null}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`bg-white ${className}`}>
      <div className="relative h-[42vh] min-h-[280px] max-h-[480px] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/20" aria-hidden />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            {breadcrumbItems.length > 0 ? (
              <div className="mb-4 [&_a]:text-white/70 [&_a:hover]:text-white [&_nav]:mb-0 [&_span]:text-white/90">
                <Breadcrumb items={breadcrumbItems} structuredData={structuredData} />
              </div>
            ) : null}
            <motion.h1
              className="mb-3 font-heading text-[1.75rem] font-normal leading-tight tracking-tight text-white sm:text-3xl md:text-5xl lg:text-6xl"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              variants={heroText}
            >
              {title}
            </motion.h1>
            {subtitle ? (
              <motion.p
                className="mb-6 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base md:text-lg"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                variants={heroText}
                transition={{ delay: 0.1 }}
              >
                {subtitle}
              </motion.p>
            ) : null}
            {(ctaPrimary || ctaSecondary) && (
              <motion.div
                className="flex w-full max-w-xs flex-col gap-4 sm:max-w-none sm:flex-row"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                variants={fadeUp}
                transition={{ delay: 0.15 }}
              >
                {ctaPrimary ? (
                  <Link
                    href={ctaPrimary.href}
                    className="inline-flex min-h-[48px] items-center justify-center border border-white bg-white px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-transparent hover:text-white sm:px-8"
                  >
                    {ctaPrimary.text}
                  </Link>
                ) : null}
                {ctaSecondary ? (
                  <Link
                    href={ctaSecondary.href}
                    className="inline-flex items-center justify-center border-b border-white pb-0.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-70"
                  >
                    {ctaSecondary.text}
                  </Link>
                ) : null}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
