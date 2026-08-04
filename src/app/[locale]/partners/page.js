'use client'

import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import PageHeader from '@/components/PageHeader'
import PartnerCalculator from '@/components/PartnerCalculator'
import { images } from '@/data/images'
import { baseUrl } from '@/lib/site'
import { fadeUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconBolt() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}
function IconLocation() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function IconCrane() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M6 21V8l6-5 6 5v13M10 21v-5h4v5" />
    </svg>
  )
}
function IconMoney() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.31 11.31 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z" />
    </svg>
  )
}
function IconShield() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l7 3v6c0 4.418-3.134 8.548-7 9.9C8.134 19.548 5 15.418 5 11V5l7-3z" />
    </svg>
  )
}
function IconPerson() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20H7a5 5 0 0 1 5-5 5 5 0 0 1 5 5zM12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
    </svg>
  )
}
function IconStar() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}
function IconChart() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 16l4-4 4 4 5-5" />
    </svg>
  )
}
function IconEye() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" strokeLinecap="round" />
    </svg>
  )
}
function IconReport() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M9 16h4M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-5z" />
    </svg>
  )
}
function IconGraduate() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 10l-10-7L2 10l10 7 10-7zM6 12v5c0 2.21 2.686 4 6 4s6-1.79 6-4v-5" />
    </svg>
  )
}
function IconTrophy() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4M5 3H2v4a5 5 0 0 0 5 5h.1A7 7 0 0 0 12 17a7 7 0 0 0 4.9-5H17a5 5 0 0 0 5-5V3h-3M5 3h14" />
    </svg>
  )
}
function IconHandshake() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 2H9.5L7 4.5 2 7l2 2 3-2 2 2-2 2 2 2 2-2 1 1-3 3 2 2 5.5-5.5 2.5 2.5L22 11l-5-5-1-1.5L14.5 2z" />
    </svg>
  )
}
function IconWhatsApp() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.137.563 4.139 1.545 5.875L.057 23.784a.5.5 0 0 0 .613.62l6.083-1.595A11.937 11.937 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.794 9.794 0 0 1-5.002-1.372l-.357-.213-3.706.972.986-3.598-.234-.369A9.794 9.794 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  )
}

const WA_HREF = 'https://wa.me/34628571537'

function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center mx-auto'
  return (
    <motion.div
      className={`mb-10 md:mb-14 ${alignClass} max-w-2xl`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOptions}
      variants={fadeUp}
    >
      {eyebrow ? (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-heading text-2xl font-normal tracking-tight text-black sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base">{subtitle}</p>
      ) : null}
    </motion.div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PartnersPage() {
  const t = useTranslations('partners')
  const tCommon = useTranslations('breadcrumb')
  const locale = useLocale()

  const benefits = [
    { icon: <IconMoney />, title: t('benefits.b1Title'), desc: t('benefits.b1Desc') },
    { icon: <IconShield />, title: t('benefits.b2Title'), desc: t('benefits.b2Desc') },
    { icon: <IconPerson />, title: t('benefits.b3Title'), desc: t('benefits.b3Desc') },
    { icon: <IconStar />, title: t('benefits.b4Title'), desc: t('benefits.b4Desc') },
    { icon: <IconChart />, title: t('benefits.b5Title'), desc: t('benefits.b5Desc') },
    { icon: <IconEye />, title: t('benefits.b6Title'), desc: t('benefits.b6Desc') },
  ]

  const tiers = [
    { name: 'Silver', volume: t('tiers.silverVolume'), benefits: t('tiers.silverBenefits'), featured: false },
    { name: 'Gold', volume: t('tiers.goldVolume'), benefits: t('tiers.goldBenefits'), featured: false },
    { name: 'Platinum', volume: t('tiers.platinumVolume'), benefits: t('tiers.platinumBenefits'), featured: true },
  ]

  const steps = [
    { num: '01', title: t('howTo.step1Title'), desc: t('howTo.step1Desc') },
    { num: '02', title: t('howTo.step2Title'), desc: t('howTo.step2Desc') },
    { num: '03', title: t('howTo.step3Title'), desc: t('howTo.step3Desc') },
    { num: '04', title: t('howTo.step4Title'), desc: t('howTo.step4Desc') },
  ]

  const tools = [
    { icon: <IconReport />, title: t('tools.t1Title'), desc: t('tools.t1Desc') },
    { icon: <IconGraduate />, title: t('tools.t2Title'), desc: t('tools.t2Desc') },
    { icon: <IconTrophy />, title: t('tools.t3Title'), desc: t('tools.t3Desc') },
    { icon: <IconHandshake />, title: t('tools.t4Title'), desc: t('tools.t4Desc') },
  ]

  const features = [
    {
      icon: <IconCrane />,
      title: t('why.feature1Title'),
      desc: t('why.feature1Desc'),
      image: images.services.reformas,
    },
    {
      icon: <IconLocation />,
      title: t('why.feature2Title'),
      desc: t('why.feature2Desc'),
      image: images.showroom,
    },
    {
      icon: <IconBolt />,
      title: t('why.feature3Title'),
      desc: t('why.feature3Desc'),
      image: images.services.banos,
    },
  ]

  const stats = [
    { label: t('why.stat1Label'), value: t('why.stat1Value') },
    { label: t('why.stat2Label'), value: t('why.stat2Value') },
    { label: t('why.stat3Label'), value: t('why.stat3Value') },
  ]

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        breadcrumbItems={[
          { label: tCommon('home'), href: `/${locale}` },
          { label: t('hero.eyebrow'), href: null },
        ]}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        heroImage={images.showroom}
        heroImageAlt={t('showroom.title')}
        ctaPrimary={{ text: t('hero.ctaPrimary'), href: WA_HREF }}
        ctaSecondary={{ text: t('hero.ctaSecondary'), href: '#calculadora' }}
        baseUrl={baseUrl}
      />

      {/* Audience strip */}
      <div className="border-b border-gray-200 bg-white">
        <p className="px-4 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500 sm:px-6">
          {t('hero.audience')}
        </p>
      </div>

      {/* Why — intro + features */}
      <section className="section-editorial bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeading title={t('why.title')} subtitle={t('why.intro')} />

          <motion.div
            className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={staggerContainer}
          >
            {features.map((f) => (
              <motion.article key={f.title} variants={staggerItem} className="group">
                <div className="relative mb-5 aspect-[4/5] overflow-hidden sm:mb-6">
                  <Image
                    src={f.image}
                    alt={f.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                </div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center border border-black text-black">
                  {f.icon}
                </div>
                <h3 className="mb-2 font-heading text-xl font-normal tracking-tight text-black sm:text-2xl">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">{f.desc}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-charcoal px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="border border-white/15 p-8 text-center md:p-10">
              <span className="font-heading text-2xl text-white md:text-3xl lg:text-4xl">
                {stat.label}
              </span>
              <span className="mt-3 block text-sm leading-relaxed text-white/75 md:text-base">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="section-editorial border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeading title={t('benefits.title')} />
          <motion.div
            className="grid gap-px bg-gray-200 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={staggerContainer}
          >
            {benefits.map((b) => (
              <motion.div
                key={b.title}
                variants={staggerItem}
                className="bg-white p-8 transition-colors duration-300 hover:bg-gray-bg md:p-10"
              >
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center border border-black text-black">
                  {b.icon}
                </div>
                <h3 className="mb-2 text-base font-semibold tracking-tight text-black sm:text-lg">
                  {b.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tiers */}
      <section className="section-editorial bg-gray-bg">
        <div className="mx-auto max-w-5xl">
          <SectionHeading title={t('tiers.title')} subtitle={t('tiers.subtitle')} />

          <motion.div
            className="overflow-x-auto border border-gray-200 bg-white"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeUp}
          >
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-black text-white">
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] sm:px-6">
                    {t('tiers.colLevel')}
                  </th>
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] sm:px-6">
                    {t('tiers.colVolume')}
                  </th>
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] sm:px-6">
                    {t('tiers.colBenefits')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((tier) => (
                  <tr
                    key={tier.name}
                    className={`border-t border-gray-200 ${
                      tier.featured ? 'bg-black text-white' : 'bg-white text-black'
                    }`}
                  >
                    <td className="px-5 py-5 font-heading text-lg font-normal tracking-tight sm:px-6 sm:text-xl">
                      {tier.name}
                    </td>
                    <td
                      className={`px-5 py-5 font-medium sm:px-6 ${
                        tier.featured ? 'text-white/85' : 'text-gray-800'
                      }`}
                    >
                      {tier.volume}
                    </td>
                    <td
                      className={`px-5 py-5 leading-relaxed sm:px-6 ${
                        tier.featured ? 'text-white/75' : 'text-gray-600'
                      }`}
                    >
                      {tier.benefits}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <p className="mt-6 text-center text-xs leading-relaxed text-gray-500">{t('tiers.notice')}</p>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculadora" className="section-editorial border-y border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeading title={t('calculator.title')} subtitle={t('calculator.subtitle')} />
          <PartnerCalculator />
        </div>
      </section>

      {/* How to — proceso timeline */}
      <section className="section-editorial border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl">
          <SectionHeading title={t('howTo.title')} />
          <div className="relative">
            <div
              className="absolute bottom-0 left-6 top-0 hidden w-px bg-gray-200 md:left-8 md:block"
              aria-hidden
            />
            <motion.div
              className="space-y-10 md:space-y-14"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              variants={staggerContainer}
            >
              {steps.map((step) => (
                <motion.div
                  key={step.num}
                  className="relative flex items-start gap-4 sm:gap-6 md:gap-10"
                  variants={staggerItem}
                >
                  <div className="z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center border border-black bg-white text-[11px] font-semibold tracking-[0.1em] text-black sm:h-12 sm:w-12 sm:text-xs md:h-16 md:w-16 md:text-sm">
                    {step.num}
                  </div>
                  <div className="min-w-0 flex-1 pt-1 md:pt-3">
                    <h3 className="mb-2 text-base font-semibold tracking-tight text-black sm:text-lg md:text-xl">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600 md:text-base">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="section-editorial bg-gray-bg">
        <div className="mx-auto max-w-7xl">
          <SectionHeading title={t('tools.title')} />
          <motion.div
            className="grid gap-3 sm:grid-cols-2 sm:gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={staggerContainer}
          >
            {tools.map((tool) => (
              <motion.div
                key={tool.title}
                variants={staggerItem}
                className="flex gap-5 border border-gray-200 bg-white p-7 transition-colors duration-300 hover:border-gray-400 md:p-8"
              >
                <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center border border-black text-black">
                  {tool.icon}
                </div>
                <div>
                  <h3 className="mb-2 text-base font-semibold tracking-tight text-black">
                    {tool.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">{tool.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Showroom — two-col editorial */}
      <section className="section-editorial bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4] lg:aspect-[4/5]"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeUp}
          >
            <Image
              src={images.showroom}
              alt={t('showroom.title')}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
              {t('why.feature2Title')}
            </p>
            <h2 className="mb-4 font-heading text-2xl font-normal tracking-tight text-black sm:text-3xl md:text-4xl">
              {t('showroom.title')}
            </h2>
            <p className="mb-4 max-w-md text-sm leading-relaxed text-gray-600 sm:text-base">
              {t('showroom.body')}
            </p>
            <p className="mb-8 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base">
              {t('showroom.international')}
            </p>
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              {t('showroom.cta')}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contacto-partners" className="cta-section">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            className="mb-4 font-heading text-3xl font-normal tracking-tight text-white md:text-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeUp}
          >
            {t('contact.title')}
          </motion.h2>
          <motion.p
            className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/75 md:text-lg"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeUp}
            transition={{ delay: 0.08 }}
          >
            {t('contact.subtitle')}
          </motion.p>

          <motion.div
            className="mb-12 flex flex-col items-center gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeUp}
            transition={{ delay: 0.15 }}
          >
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2.5 bg-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-gray-200"
            >
              <IconWhatsApp />
              {t('contact.whatsAppCta')}
            </a>
          </motion.div>

          <motion.div
            className="space-y-1 border-t border-white/15 pt-8 text-sm text-white/70"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeUp}
            transition={{ delay: 0.2 }}
          >
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
              Dekorama Group
            </p>
            <p>Avenida Tivoli, 17, Local 5</p>
            <p>29631 Benalmádena, Málaga</p>
            <a href="tel:+34628571537" className="mt-2 block transition-opacity hover:opacity-100 hover:text-white">
              +34 628 571 537
            </a>
            <a
              href="https://www.dekoramagroup.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-opacity hover:opacity-100 hover:text-white"
            >
              www.dekoramagroup.com
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
