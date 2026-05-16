'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'

const TIERS = [
  { key: 'SILVER', label: 'Silver', rate: 0.05, min: 0, max: 10000, color: 'bg-gray-400', textColor: 'text-gray-700' },
  { key: 'GOLD', label: 'Gold', rate: 0.10, min: 10000, max: 30000, color: 'bg-yellow-500', textColor: 'text-yellow-700' },
  { key: 'PLATINUM', label: 'Platinum', rate: 0.15, min: 30000, max: Infinity, color: 'bg-black', textColor: 'text-black' },
]

function getTier(annualVolume) {
  return TIERS.findLast((t) => annualVolume >= t.min) ?? TIERS[0]
}

function formatEur(value) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)
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
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-3xl mx-auto">
      {/* Input */}
      <div className="space-y-4 mb-10">
        <label className="block text-sm font-semibold text-gray-500 uppercase tracking-widest">
          {t('label')}
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400 select-none">€</span>
          <input
            type="text"
            inputMode="numeric"
            value={monthly === 0 ? '' : monthly.toLocaleString('de-DE')}
            onChange={handleChange}
            placeholder="0"
            className="w-full pl-10 pr-4 py-4 text-3xl font-bold text-black border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
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
        <div className="flex justify-between text-xs text-gray-400">
          <span>€0 / mes</span>
          <span>€5.000 / mes</span>
        </div>
      </div>

      {/* Tier indicators */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        {TIERS.map((t_item) => {
          const isActive = tier.key === t_item.key
          return (
            <div
              key={t_item.key}
              className={`rounded-xl p-4 text-center transition-all duration-300 ${
                isActive
                  ? t_item.key === 'PLATINUM'
                    ? 'bg-black text-white shadow-md'
                    : t_item.key === 'GOLD'
                    ? 'bg-yellow-400 text-black shadow-md'
                    : 'bg-gray-200 text-black shadow-md'
                  : 'bg-gray-50 text-gray-400 opacity-50'
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-widest mb-1">{t_item.label}</div>
              <div className="text-lg font-bold">{(t_item.rate * 100).toFixed(0)}%</div>
            </div>
          )
        })}
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <ResultCard label={t('annualLabel')} value={formatEur(annualVolume)} />
        <ResultCard label={t('tierLabel')} value={tier.label} highlight />
        <ResultCard label={t('earnLabel')} value={formatEur(annualCommission)} highlight />
      </div>

      <p className="text-xs text-gray-400 text-center leading-relaxed">{t('disclaimer')}</p>
    </div>
  )
}

function ResultCard({ label, value, highlight = false }) {
  return (
    <div className={`rounded-xl p-5 text-center ${highlight ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      <div className={`text-xs font-semibold uppercase tracking-widest mb-2 ${highlight ? 'text-gray-400' : 'text-gray-500'}`}>
        {label}
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}
