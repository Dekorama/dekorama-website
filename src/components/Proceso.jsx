'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

const STEP_KEYS = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6']

export default function Proceso() {
  const t = useTranslations('proceso')
  const tHome = useTranslations('home')
  const pasos = STEP_KEYS.map((key, i) => ({
    numero: String(i + 1).padStart(2, '0'),
    titulo: t(`${key}Title`),
    descripcion: t(`${key}Desc`),
  }))

  return (
    <section id="proceso" className="section-editorial border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="mb-10 text-center md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeUp}
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
            {tHome('processEyebrow')}
          </p>
          <h2 className="font-heading text-2xl font-normal tracking-tight text-black sm:text-3xl md:text-4xl">
            {t('title')}
          </h2>
        </motion.div>
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
            {pasos.map((paso, index) => (
              <motion.div key={index} className="relative flex items-start gap-4 sm:gap-6 md:gap-10" variants={staggerItem}>
                <div className="z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center border border-black bg-white text-[11px] font-semibold tracking-[0.1em] text-black sm:h-12 sm:w-12 sm:text-xs md:h-16 md:w-16 md:text-sm">
                  {paso.numero}
                </div>
                <div className="min-w-0 flex-1 pt-1 md:pt-3">
                  <h3 className="mb-2 text-base font-semibold tracking-tight text-black sm:text-lg md:text-xl">
                    {paso.titulo}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600 md:text-base">{paso.descripcion}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
