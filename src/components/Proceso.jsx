'use client'

import { useTranslations } from 'next-intl'

const STEP_KEYS = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6']

export default function Proceso() {
  const t = useTranslations('proceso')
  const pasos = STEP_KEYS.map((key, i) => ({
    numero: String(i + 1).padStart(2, '0'),
    titulo: t(`${key}Title`),
    descripcion: t(`${key}Desc`),
  }))

  return (
    <section id="proceso" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-16">
          {t('title')}
        </h2>
        <div className="relative">
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gray-300 hidden md:block" aria-hidden />
          <div className="space-y-12 md:space-y-16">
            {pasos.map((paso, index) => (
              <div key={index} className="relative flex items-start gap-6 md:gap-8">
                <div className="flex-shrink-0 w-16 md:w-24 h-16 md:h-24 rounded-full bg-black text-white flex items-center justify-center text-xl md:text-2xl font-bold z-10 border-4 border-white shadow-lg">
                  {paso.numero}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl md:text-2xl font-semibold text-black mb-3">{paso.titulo}</h3>
                  <p className="text-gray-600 leading-relaxed">{paso.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
