'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'

const TIERS = [
  { key: 'SILVER', label: 'Silver', rate: 0.05, min: 0, max: 10000 },
  { key: 'GOLD', label: 'Gold', rate: 0.1, min: 10000, max: 30000 },
  { key: 'PLATINUM', label: 'Platinum', rate: 0.15, min: 30000, max: Infinity },
]

function getTier(annualVolume) {
  return TIERS.findLast((t) => annualVolume >= t.min) ?? TIERS[0]
}

const eurFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

function formatEur(value) {
  return eurFormatter.format(value)
}

export default function PartnerCalculator() {
  const t = useTranslations('partners.calculator')
  const [monthly, setMonthly] = useState(2000)

  const annualVolume = monthly * 12
  const tier = getTier(annualVolume)
  const annualCommission = annualVolume * tier.rate

  const handleChange = useCallback((e) => {
    const raw = e.target.value.replace(/\D/g, '')
    setMonthly(Math.min(Number(raw) || 0, 999999))
  }, [])

  const handleSlider = useCallback((e) => {
    setMonthly(Number(e.target.value))
  }, [])

  return (
    <div className="mx-auto max-w-3xl border border-gray-200 bg-white p-6 sm:p-8 md:p-12">
      <div className="mb-10 space-y-4">
        <label className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
          {t('label')}
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 select-none font-heading text-2xl text-gray-400">
            €
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={monthly === 0 ? '' : monthly.toLocaleString('de-DE')}
            onChange={handleChange}
            placeholder="0"
            className="w-full border border-gray-300 bg-white py-4 pl-12 pr-5 font-heading text-3xl font-normal tracking-tight text-black transition-colors focus:border-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          />
        </div>
        <input
          type="range"
          min={0}
          max={5000}
          step={100}
          value={Math.min(monthly, 5000)}
          onChange={handleSlider}
          className="w-full accent-black"
        />
        <div className="flex justify-between text-[11px] uppercase tracking-[0.14em] text-gray-400">
          <span>€0 / mes</span>
          <span>€5.000 / mes</span>
        </div>
      </div>

      <div className="mb-10 grid grid-cols-3 gap-px bg-gray-200">
        {TIERS.map((item) => {
          const isActive = tier.key === item.key
          return (
            <div
              key={item.key}
              className={`p-4 text-center transition-colors duration-300 sm:p-5 ${
                isActive
                  ? item.key === 'PLATINUM'
                    ? 'bg-black text-white'
                    : 'bg-gray-bg text-black'
                  : 'bg-white text-gray-400'
              }`}
            >
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-[11px]">
                {item.label}
              </div>
              <div className="font-heading text-xl font-normal tracking-tight sm:text-2xl">
                {(item.rate * 100).toFixed(0)}%
              </div>
            </div>
          )
        })}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-px bg-gray-200 sm:grid-cols-3">
        <ResultCard label={t('annualLabel')} value={formatEur(annualVolume)} />
        <ResultCard label={t('tierLabel')} value={tier.label} highlight />
        <ResultCard label={t('earnLabel')} value={formatEur(annualCommission)} highlight />
      </div>

      <p className="text-center text-xs leading-relaxed text-gray-500">{t('disclaimer')}</p>
    </div>
  )
}

function ResultCard({ label, value, highlight = false }) {
  return (
    <div className={`p-5 text-center sm:p-6 ${highlight ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div
        className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-[11px] ${
          highlight ? 'text-white/55' : 'text-gray-500'
        }`}
      >
        {label}
      </div>
      <div className="font-heading text-2xl font-normal tracking-tight">{value}</div>
    </div>
  )
}
