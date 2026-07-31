'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { images } from '@/data/images'
import { fadeUp, viewportOptions } from '@/lib/animations'

/**
 * @param {{ variant?: 'spain' | 'caracas' }} props
 */
export default function TwoColShowroom({ variant = 'spain' }) {
  const isCaracas = variant === 'caracas'
  const t = useTranslations(isCaracas ? 'homeCaracas' : 'home')

  const cols = isCaracas
    ? [
        {
          image: images.markets.caracas,
          title: t('localTitle'),
          body: t('localBody'),
          cta: t('localCta'),
          href: '/contacto-caracas',
        },
        {
          image: images.services.reformas,
          title: t('servicesTitle'),
          body: t('servicesBody'),
          cta: t('servicesCta'),
          href: '/servicios',
        },
      ]
    : [
        {
          image: images.showroom,
          title: t('showroomTitle'),
          body: t('showroomBody'),
          cta: t('showroomCta'),
          href: '/materiales',
        },
        {
          image: images.services.reformas,
          title: t('servicesTitle'),
          body: t('servicesBody'),
          cta: t('servicesCta'),
          href: '/servicios',
        },
      ]

  return (
    <section className="section-editorial bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:gap-10 lg:gap-16">
        {cols.map((col, i) => (
          <motion.article
            key={col.href + col.title}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeUp}
            transition={{ delay: i * 0.1 }}
          >
            <div className="relative mb-5 aspect-[4/5] overflow-hidden sm:mb-6">
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <h2 className="mb-3 font-heading text-xl font-normal tracking-tight text-black sm:text-2xl md:text-3xl">
              {col.title}
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-gray-600 md:text-base">{col.body}</p>
            <Link href={col.href} className="btn-discover">
              {col.cta}
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
