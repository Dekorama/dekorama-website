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
export default function DualLandscape({ variant = 'spain' }) {
  const isCaracas = variant === 'caracas'
  const t = useTranslations(isCaracas ? 'homeCaracas' : 'home')

  const items = isCaracas
    ? [
        {
          image: images.dual.materials,
          title: t('dualMaterials'),
          sub: t('dualMaterialsSub'),
          href: '/materiales-caracas',
        },
        {
          image: images.dual.projects,
          title: t('dualProjects'),
          sub: t('dualProjectsSub'),
          href: '/proyectos',
        },
      ]
    : [
        {
          image: images.dual.materials,
          title: t('dualMaterials'),
          sub: t('dualMaterialsSub'),
          href: '/materiales',
        },
        {
          image: images.dual.projects,
          title: t('dualProjects'),
          sub: t('dualProjectsSub'),
          href: '/proyectos',
        },
      ]

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {items.map((item, i) => (
        <motion.div
          key={item.href}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeUp}
          transition={{ delay: i * 0.08 }}
        >
          <Link
            href={item.href}
            className="group relative block aspect-[16/10] overflow-hidden md:aspect-[3/2]"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/45" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white sm:px-6">
              <h2 className="font-heading text-2xl tracking-tight sm:text-3xl md:text-4xl">{item.title}</h2>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/85 sm:text-xs">{item.sub}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </section>
  )
}
