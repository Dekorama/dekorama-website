'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { images } from '@/data/images'
import { fadeUp, viewportOptions } from '@/lib/animations'

const LABEL_KEYS = {
  bathroom: 'bathroom',
  kitchen: 'kitchen',
  fullRenovation: 'fullRenovation',
}

export default function FeaturedSpaces() {
  const t = useTranslations('home')
  const tMega = useTranslations('megaNav')

  return (
    <section className="section-editorial bg-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-8 text-center md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeUp}
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
            {t('spacesEyebrow')}
          </p>
          <h2 className="font-heading text-2xl font-normal tracking-tight text-black sm:text-3xl md:text-4xl">
            {t('spacesTitle')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5">
          {images.spaces.map((space, i) => (
            <motion.div
              key={space.href}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              variants={fadeUp}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={space.href} className="group relative block aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
                <Image
                  src={space.src}
                  alt={tMega(LABEL_KEYS[space.labelKey] || space.labelKey)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-0 right-0 px-3 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white sm:bottom-6 sm:text-xs">
                  {tMega(LABEL_KEYS[space.labelKey] || space.labelKey)}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
