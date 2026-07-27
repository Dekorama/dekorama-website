'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { fadeUp, viewportOptions } from '@/lib/animations'
import ContactChannels from '@/components/ContactChannels'

const TIPO_REFORMA_OPTIONS = [
  { value: '', labelKey: 'placeholder' },
  { value: 'integral', labelKey: 'integral' },
  { value: 'cocina', labelKey: 'cocina' },
  { value: 'bano', labelKey: 'bano' },
  { value: 'otro', labelKey: 'otro' },
]

export default function CTAFinal({ marketId = 'spain' }) {
  const t = useTranslations('form')
  const tCta = useTranslations('cta')
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    tipoReforma: '',
    descripcion: '',
  })
  const [status, setStatus] = useState(null) // 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, market: marketId }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus('error')
        setErrorMessage(data.error || t('errorGeneric'))
        return
      }
      setStatus('success')
      setFormData({ nombre: '', telefono: '', email: '', tipoReforma: '', descripcion: '' })
    } catch {
      setStatus('error')
      setErrorMessage(t('errorConnection'))
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contacto" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-bg">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-semibold text-black text-center mb-4 tracking-tight"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeUp}
        >
          {tCta('readyToTransform')}
        </motion.h2>
        <motion.p 
          className="text-gray-600 text-center mb-12 max-w-xl mx-auto leading-relaxed"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeUp}
          transition={{ delay: 0.1 }}
        >
          {tCta('tellUsProject')}
        </motion.p>

        {status === 'success' && (
          <div className="mb-8 p-6 bg-black text-white text-center rounded-lg">
            <p className="font-medium">{t('successTitle')}</p>
            <p className="text-sm text-gray-300 mt-1">{t('successSubtitle')}</p>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-8 p-6 border border-red-300 bg-red-50 text-red-800 text-center rounded-lg">
            <p>{errorMessage}</p>
          </div>
        )}

        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeUp}
          transition={{ delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="nombre"
              placeholder={t('name')}
              value={formData.nombre}
              onChange={handleChange}
              className="input-field"
              required
              disabled={status === 'loading'}
            />
            <input
              type="tel"
              name="telefono"
              placeholder={t('phone')}
              value={formData.telefono}
              onChange={handleChange}
              className="input-field"
              required
              disabled={status === 'loading'}
            />
          </div>
            <input
              type="email"
              name="email"
              placeholder={t('email')}
              value={formData.email}
            onChange={handleChange}
            className="input-field"
            required
            disabled={status === 'loading'}
          />
            <div className="relative">
            <select
              name="tipoReforma"
              value={formData.tipoReforma}
              onChange={handleChange}
              className="input-field appearance-none pr-12 bg-white cursor-pointer"
              required
              disabled={status === 'loading'}
            >
              {TIPO_REFORMA_OPTIONS.map((opt) => (
                <option key={opt.value || 'placeholder'} value={opt.value}>
                  {t(`projectTypeOptions.${opt.labelKey}`)}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
          <div>
            <label htmlFor="descripcion" className="sr-only">
              Descripción del proyecto
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              placeholder={t('descriptionPlaceholder')}
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
              className="input-field resize-y min-h-[120px]"
              disabled={status === 'loading'}
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary w-full disabled:opacity-70 disabled:pointer-events-none"
          >
            {status === 'loading' ? t('sending') : t('submit')}
          </button>
        </motion.form>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeUp}
          transition={{ delay: 0.3 }}
        >
          <ContactChannels marketId={marketId} className="pt-8 border-t border-gray-300" />
        </motion.div>
      </div>
    </section>
  )
}
