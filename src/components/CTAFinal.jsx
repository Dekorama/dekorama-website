'use client'

import { useState } from 'react'

const TIPO_REFORMA_OPTIONS = [
  { value: '', label: 'Tipo de reforma' },
  { value: 'integral', label: 'Reforma integral' },
  { value: 'cocina', label: 'Cocina a medida' },
  { value: 'bano', label: 'Baño completo' },
  { value: 'otro', label: 'Otro' },
]

export default function CTAFinal() {
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
        body: JSON.stringify(formData),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus('error')
        setErrorMessage(data.error || 'No se pudo enviar. Inténtelo de nuevo.')
        return
      }
      setStatus('success')
      setFormData({ nombre: '', telefono: '', email: '', tipoReforma: '', descripcion: '' })
    } catch {
      setStatus('error')
      setErrorMessage('Error de conexión. Inténtelo de nuevo o contacte por teléfono.')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const inputClass =
    'w-full px-6 py-4 border border-gray-300 bg-white focus:outline-none focus:border-black transition-colors rounded'

  return (
    <section id="contacto" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-bg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-4">
          ¿Listo para transformar tu espacio?
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto leading-relaxed">
          Cuéntanos tu proyecto y te respondemos sin compromiso. Incluye todos los detalles que quieras para que podamos orientarte mejor.
        </p>

        {status === 'success' && (
          <div className="mb-8 p-6 bg-black text-white text-center rounded-lg">
            <p className="font-medium">Mensaje enviado correctamente.</p>
            <p className="text-sm text-gray-300 mt-1">Te contestaremos lo antes posible.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-8 p-6 border border-red-300 bg-red-50 text-red-800 text-center rounded-lg">
            <p>{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre *"
              value={formData.nombre}
              onChange={handleChange}
              className={inputClass}
              required
              disabled={status === 'loading'}
            />
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono *"
              value={formData.telefono}
              onChange={handleChange}
              className={inputClass}
              required
              disabled={status === 'loading'}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            required
            disabled={status === 'loading'}
          />
          <div className="relative">
            <select
              name="tipoReforma"
              value={formData.tipoReforma}
              onChange={handleChange}
              className={`${inputClass} appearance-none pr-12 bg-white cursor-pointer`}
              required
              disabled={status === 'loading'}
            >
              {TIPO_REFORMA_OPTIONS.map((opt) => (
                <option key={opt.value || 'placeholder'} value={opt.value}>
                  {opt.label}
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
              placeholder="Describe tu proyecto o lo que necesitas (opcional)"
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
              className={`${inputClass} resize-y min-h-[120px]`}
              disabled={status === 'loading'}
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:pointer-events-none disabled:scale-100"
          >
            {status === 'loading' ? 'Enviando…' : 'Solicitar consulta gratuita'}
          </button>
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 border-t border-gray-300">
          <a
            href="https://wa.me/34628571537"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-whatsapp flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <span className="font-medium">+34 628 571 537</span>
          </a>
          <a href="tel:+34628571537" className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors group">
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span className="font-medium">+34 628 571 537</span>
          </a>
        </div>
      </div>
    </section>
  )
}
