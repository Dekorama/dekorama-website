'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { images } from '@/data/images'
import { fadeUp, viewportOptions } from '@/lib/animations'

export default function FeaturedMaterial() {
  const t = useTranslations('home')

  return (
    <section className="section-editorial border-y border-gray-200 bg-gray-bg">
      <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4] lg:aspect-[4/5]"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeUp}
        >
          <Image
            src={images.featured.main}
            alt={t('featuredTitle')}
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
            {t('featuredEyebrow')}
          </p>
          <h2 className="mb-4 font-heading text-2xl font-normal tracking-tight text-black sm:text-3xl md:text-4xl">
            {t('featuredTitle')}
          </h2>
          <p className="mb-8 max-w-md text-sm text-gray-600 sm:mb-10 sm:text-base">{t('featuredBody')}</p>

          <div className="grid max-w-lg grid-cols-2 gap-3 sm:gap-6">
            {images.featured.swatches.map((swatch) => (
              <Link key={swatch.href} href={swatch.href} className="group">
                <div className="relative mb-2.5 aspect-square overflow-hidden bg-gray-100 sm:mb-3">
                  <Image
                    src={swatch.src}
                    alt={t(swatch.labelKey)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 45vw, 220px"
                  />
                </div>
                <p className="text-sm text-gray-800">{t(swatch.labelKey)}</p>
                <span className="btn-discover mt-2 text-[10px]">{t('viewDetails')}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
