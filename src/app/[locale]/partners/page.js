'use client'

import { useTranslations } from 'next-intl'
import PartnerCalculator from '@/components/PartnerCalculator'

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconBolt() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}
function IconLocation() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function IconCrane() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M6 21V8l6-5 6 5v13M10 21v-5h4v5" />
    </svg>
  )
}
function IconMoney() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.31 11.31 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z" />
    </svg>
  )
}
function IconShield() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l7 3v6c0 4.418-3.134 8.548-7 9.9C8.134 19.548 5 15.418 5 11V5l7-3z" />
    </svg>
  )
}
function IconPerson() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20H7a5 5 0 0 1 5-5 5 5 0 0 1 5 5zM12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
    </svg>
  )
}
function IconStar() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}
function IconChart() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 16l4-4 4 4 5-5" />
    </svg>
  )
}
function IconEye() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" strokeLinecap="round" />
    </svg>
  )
}
function IconReport() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M9 16h4M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-5z" />
    </svg>
  )
}
function IconGraduate() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 10l-10-7L2 10l10 7 10-7zM6 12v5c0 2.21 2.686 4 6 4s6-1.79 6-4v-5" />
    </svg>
  )
}
function IconTrophy() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4M5 3H2v4a5 5 0 0 0 5 5h.1A7 7 0 0 0 12 17a7 7 0 0 0 4.9-5H17a5 5 0 0 0 5-5V3h-3M5 3h14" />
    </svg>
  )
}
function IconHandshake() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 2H9.5L7 4.5 2 7l2 2 3-2 2 2-2 2 2 2 2-2 1 1-3 3 2 2 5.5-5.5 2.5 2.5L22 11l-5-5-1-1.5L14.5 2z" />
    </svg>
  )
}
function IconWhatsApp() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.137.563 4.139 1.545 5.875L.057 23.784a.5.5 0 0 0 .613.62l6.083-1.595A11.937 11.937 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.794 9.794 0 0 1-5.002-1.372l-.357-.213-3.706.972.986-3.598-.234-.369A9.794 9.794 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PartnersPage() {
  const t = useTranslations('partners')

  const benefits = [
    { icon: <IconMoney />, title: t('benefits.b1Title'), desc: t('benefits.b1Desc') },
    { icon: <IconShield />, title: t('benefits.b2Title'), desc: t('benefits.b2Desc') },
    { icon: <IconPerson />, title: t('benefits.b3Title'), desc: t('benefits.b3Desc') },
    { icon: <IconStar />, title: t('benefits.b4Title'), desc: t('benefits.b4Desc') },
    { icon: <IconChart />, title: t('benefits.b5Title'), desc: t('benefits.b5Desc') },
    { icon: <IconEye />, title: t('benefits.b6Title'), desc: t('benefits.b6Desc') },
  ]

  const tiers = [
    { name: 'Silver', volume: t('tiers.silverVolume'), benefits: t('tiers.silverBenefits'), shade: 'bg-gray-50' },
    { name: 'Gold', volume: t('tiers.goldVolume'), benefits: t('tiers.goldBenefits'), shade: 'bg-yellow-50' },
    { name: 'Platinum', volume: t('tiers.platinumVolume'), benefits: t('tiers.platinumBenefits'), shade: 'bg-gray-900 text-white' },
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

  return (
    <div className="min-h-screen bg-white pt-14 sm:pt-16 md:pt-[4.25rem]">

      {/* ── 1. Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_#ffffff_0%,_transparent_60%)]" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl space-y-6">
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-gray-400 border border-gray-700 px-4 py-1.5 rounded-full">
              {t('hero.eyebrow')}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
              {t('hero.subtitle')}
            </p>
            <p className="text-sm text-gray-500 tracking-wide">
              {t('hero.audience')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="https://wa.me/34628571537"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center"
              >
                {t('hero.ctaPrimary')}
              </a>
              <a
                href="#calculadora"
                className="px-8 py-4 border border-gray-600 text-white font-semibold hover:border-white transition-all duration-300 rounded-lg text-center"
              >
                {t('hero.ctaSecondary')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Why Dekorama ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-14">
            {t('why.title')}
          </h2>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 mb-14">
            {[
              { label: t('why.stat1Label'), value: t('why.stat1Value') },
              { label: t('why.stat2Label'), value: t('why.stat2Value') },
              { label: t('why.stat3Label'), value: t('why.stat3Value') },
            ].map((stat, i) => (
              <div
                key={i}
                className={`rounded-xl p-6 text-center ${i === 1 ? 'bg-gray-700' : 'bg-gray-900'} text-white`}
              >
                <div className="text-xl md:text-2xl font-bold mb-1">{stat.label}</div>
                <div className="text-xs md:text-sm text-gray-400">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Intro text */}
          <p className="text-center text-gray-600 text-lg max-w-3xl mx-auto mb-14 leading-relaxed">
            {t('why.intro')}
          </p>

          {/* Feature icons */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <IconCrane />, title: t('why.feature1Title'), desc: t('why.feature1Desc') },
              { icon: <IconLocation />, title: t('why.feature2Title'), desc: t('why.feature2Desc') },
              { icon: <IconBolt />, title: t('why.feature3Title'), desc: t('why.feature3Desc') },
            ].map((f, i) => (
              <div key={i} className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-black text-white rounded-full mx-auto">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-black text-lg">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Benefits ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gray-bg">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-14">
            {t('benefits.title')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-8 space-y-4 hover:shadow-md transition-shadow duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-bg rounded-lg text-black group-hover:bg-black group-hover:text-white transition-colors duration-300">
                  {b.icon}
                </div>
                <h3 className="font-semibold text-black text-lg">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Tiers ────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-4">
            {t('tiers.title')}
          </h2>
          <p className="text-center text-gray-500 max-w-2xl mx-auto mb-14 leading-relaxed">
            {t('tiers.subtitle')}
          </p>

          {/* Table */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-black text-white">
                  <th className="px-6 py-5 text-left font-semibold tracking-wide">{t('tiers.colLevel')}</th>
                  <th className="px-6 py-5 text-left font-semibold tracking-wide">{t('tiers.colVolume')}</th>
                  <th className="px-6 py-5 text-left font-semibold tracking-wide">{t('tiers.colBenefits')}</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((tier, i) => (
                  <tr key={i} className={`${tier.shade} border-t border-gray-100`}>
                    <td className="px-6 py-5 font-bold text-base">{tier.name}</td>
                    <td className="px-6 py-5 font-medium">{tier.volume}</td>
                    <td className="px-6 py-5 leading-relaxed">{tier.benefits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed italic">
            {t('tiers.notice')}
          </p>
        </div>
      </section>

      {/* ── 5. Calculator ───────────────────────────────────────────────────── */}
      <section id="calculadora" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gray-bg">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-4">
            {t('calculator.title')}
          </h2>
          <p className="text-center text-gray-500 max-w-xl mx-auto mb-14 leading-relaxed">
            {t('calculator.subtitle')}
          </p>
          <PartnerCalculator />
        </div>
      </section>

      {/* ── 6. How to ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-16">
            {t('howTo.title')}
          </h2>
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-6 md:gap-8">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold">
                  {step.num}
                </div>
                <div className="pt-3">
                  <h3 className="text-2xl font-semibold text-black mb-2">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Tools ────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gray-bg">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-14">
            {t('tools.title')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {tools.map((tool, i) => (
              <div key={i} className="bg-white rounded-xl p-8 flex gap-5 hover:shadow-md transition-shadow duration-300">
                <div className="flex-shrink-0 text-black mt-1">{tool.icon}</div>
                <div>
                  <h3 className="font-semibold text-black text-base mb-2">{tool.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Showroom ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold">{t('showroom.title')}</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{t('showroom.body')}</p>
          <p className="text-gray-400 text-base">{t('showroom.international')}</p>
          <a
            href="https://wa.me/34628571537"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            {t('showroom.cta')}
          </a>
        </div>
      </section>

      {/* ── 9. Contact ──────────────────────────────────────────────────────── */}
      <section id="contacto-partners" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-4">{t('contact.title')}</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">{t('contact.subtitle')}</p>
          </div>

          <div className="max-w-md mx-auto text-center space-y-8">
            {/* WhatsApp button */}
            <div className="space-y-4">
              <a
                href="https://wa.me/34628571537"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
              >
                <IconWhatsApp />
                {t('contact.whatsAppCta')}
              </a>
            </div>

            {/* Contact info */}
            <div className="space-y-2 text-sm text-gray-500">
              <p className="font-semibold text-black">Dekorama Group</p>
              <p>Avenida Tivoli, 17, Local 5</p>
              <p>29631 Benalmádena, Málaga</p>
              <a href="tel:+34628571537" className="block hover:text-black transition-colors">+34 628 571 537</a>
              <a href="https://www.dekoramagroup.com" target="_blank" rel="noopener noreferrer" className="block hover:text-black transition-colors">
                www.dekoramagroup.com
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
