'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import Breadcrumb, { generateBreadcrumbSchema } from './Breadcrumb'
import { motion } from 'framer-motion'
import { fadeUp, heroText, viewportOptions } from '@/lib/animations'

/**
 * @param {string} href
 * @returns {string}
 */
function toI18nHref(href) {
  if (!href || href.startsWith('http') || href.startsWith('#')) return href
  const stripped = href.replace(/^\/(es|en)(?=\/|$)/, '')
  return stripped || '/'
}

/**
 * @param {{ href: string, text: string, className: string }} props
 */
function HeaderCta({ href, text, className }) {
  if (href.startsWith('#')) {
    return (
      <a href={href} className={className}>
        {text}
      </a>
    )
  }

  return (
    <Link href={toI18nHref(href)} className={className}>
      {text}
    </Link>
  )
}

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
  /** @type {'default' | 'tall'} */
  size = 'default',
  baseUrl = 'https://www.dekoramagroup.com',
  className = '',
}) {
  const tall = size === 'tall'
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
                  <HeaderCta href={ctaPrimary.href} text={ctaPrimary.text} className="btn-primary" />
                ) : null}
                {ctaSecondary ? (
                  <HeaderCta href={ctaSecondary.href} text={ctaSecondary.text} className="btn-discover" />
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
      <div
        className={
          tall
            ? 'relative min-h-[22rem] h-[calc(100svh-var(--site-header-h,4.5rem))] max-h-[calc(100dvh-var(--site-header-h,4.5rem))] w-full overflow-hidden bg-black sm:min-h-[28rem]'
            : 'relative h-[42vh] min-h-[280px] max-h-[480px] w-full overflow-hidden'
        }
      >
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className={`absolute inset-0 ${
            tall
              ? 'bg-gradient-to-t from-black/55 via-black/20 to-black/25'
              : 'bg-gradient-to-t from-black/55 via-black/25 to-black/20'
          }`}
          aria-hidden
        />
        <div
          className={`absolute inset-0 flex flex-col px-4 sm:px-6 lg:px-8 ${
            tall ? 'items-center justify-center pb-14 pt-8 text-center sm:pb-16' : 'justify-end pb-10'
          }`}
        >
          <div className={`w-full ${tall ? 'mx-auto max-w-4xl' : 'mx-auto max-w-7xl'}`}>
            {breadcrumbItems.length > 0 ? (
              <div
                className={`mb-4 [&_a]:text-white/70 [&_a:hover]:text-white [&_nav]:mb-0 [&_span]:text-white/90 ${
                  tall ? 'flex justify-center [&_nav]:justify-center' : ''
                }`}
              >
                <Breadcrumb items={breadcrumbItems} structuredData={structuredData} />
              </div>
            ) : null}
            <motion.h1
              className={
                tall
                  ? 'mb-3 max-w-[16ch] font-heading text-[2rem] font-normal leading-[1.1] tracking-tight text-white sm:mx-auto sm:max-w-none sm:text-5xl md:text-6xl lg:text-7xl'
                  : 'mb-3 font-heading text-[1.75rem] font-normal leading-tight tracking-tight text-white sm:text-3xl md:text-5xl lg:text-6xl'
              }
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              variants={heroText}
            >
              {title}
            </motion.h1>
            {subtitle ? (
              <motion.p
                className={
                  tall
                    ? 'mx-auto mb-6 max-w-sm text-sm leading-relaxed text-white/85 sm:max-w-xl sm:text-base md:text-lg'
                    : 'mb-6 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base md:text-lg'
                }
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
                className={
                  tall
                    ? 'mx-auto flex w-full max-w-xs flex-col items-center gap-4 sm:max-w-none sm:flex-row sm:justify-center'
                    : 'flex w-full max-w-xs flex-col gap-4 sm:max-w-none sm:flex-row'
                }
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                variants={fadeUp}
                transition={{ delay: 0.15 }}
              >
                {ctaPrimary ? (
                  <HeaderCta
                    href={ctaPrimary.href}
                    text={ctaPrimary.text}
                    className="inline-flex min-h-[48px] w-full items-center justify-center border border-white bg-white px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-transparent hover:text-white sm:w-auto sm:px-8"
                  />
                ) : null}
                {ctaSecondary ? (
                  <HeaderCta
                    href={ctaSecondary.href}
                    text={ctaSecondary.text}
                    className="inline-flex items-center justify-center border-b border-white pb-0.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-70"
                  />
                ) : null}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
