'use client'

import { useTranslations } from 'next-intl'

const STEP_NUMBERS = ['01', '02', '03', '04']

export default function LinkExchangePage() {
  const t = useTranslations('linkExchange')

  const steps = [
    { title: t('howIt.step1Title'), desc: t('howIt.step1Desc') },
    { title: t('howIt.step2Title'), desc: t('howIt.step2Desc') },
    { title: t('howIt.step3Title'), desc: t('howIt.step3Desc') },
    { title: t('howIt.step4Title'), desc: t('howIt.step4Desc') },
  ]

  const niches = [
    t('whoFor.niche1'),
    t('whoFor.niche2'),
    t('whoFor.niche3'),
    t('whoFor.niche4'),
    t('whoFor.niche5'),
    t('whoFor.niche6'),
  ]

  const rules = [
    t('rules.rule1'),
    t('rules.rule2'),
    t('rules.rule3'),
    t('rules.rule4'),
    t('rules.rule5'),
  ]

  return (
    <div className="min-h-screen bg-white pt-14 sm:pt-16 md:pt-[4.25rem]">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-black text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_#ffffff_0%,_transparent_60%)]"
          aria-hidden="true"
        />
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
            <div className="pt-4">
              <a
                href="https://wa.me/34628571537"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                {t('hero.cta')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-14">
            {t('howIt.title')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-5">
                <span className="text-3xl font-black text-gray-200 leading-none shrink-0 w-10">
                  {STEP_NUMBERS[i]}
                </span>
                <div>
                  <h3 className="font-semibold text-black text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who it's for ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-4">
            {t('whoFor.title')}
          </h2>
          <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            {t('whoFor.desc')}
          </p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {niches.map((niche, i) => (
              <li
                key={i}
                className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 border border-gray-100 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-black shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium text-black">{niche}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Rules ────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-12">
            {t('rules.title')}
          </h2>
          <ol className="space-y-5">
            {rules.map((rule, i) => (
              <li key={i} className="flex gap-4">
                <span className="text-sm font-black text-gray-300 w-6 shrink-0 pt-0.5">
                  {i + 1}.
                </span>
                <p className="text-gray-700 text-sm leading-relaxed">{rule}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('cta.title')}
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {t('cta.desc')}
          </p>
          <a
            href="https://wa.me/34628571537"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            {t('cta.button')}
          </a>
        </div>
      </section>

    </div>
  )
}
