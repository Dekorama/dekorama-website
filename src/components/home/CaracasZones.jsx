'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { images } from '@/data/images'
import { fadeUp, viewportOptions } from '@/lib/animations'
import { markets } from '@/lib/markets'

/**
 * Caracas zones band — editorial.
 */
export default function CaracasZones() {
  const t = useTranslations('homeCaracas')
  const ve = markets.venezuela

  return (
    <section className="section-editorial border-y border-gray-200 bg-gray-bg">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="relative aspect-[4/3] overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeUp}
        >
          <Image
            src={images.markets.caracas}
            alt={t('zonesTitle')}
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
            {t('zonesEyebrow')}
          </p>
          <h2 className="mb-4 font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
            {t('zonesTitle')}
          </h2>
          <p className="mb-6 text-gray-600">{t('zonesBody')}</p>
          <p className="mb-8 text-sm text-gray-500">
            {t('zonesContact')}{' '}
            <a href={`mailto:${ve.email}`} className="font-medium text-black underline-offset-2 hover:underline">
              {ve.email}
            </a>
          </p>
          <Link href="/contacto-caracas" className="btn-primary">
            {t('zonesCta')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
