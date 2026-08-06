'use client'

import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { images } from '@/data/images'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'
import { useActiveMarket } from '@/lib/useActiveMarket'
import {
  marketCatalogHref,
  marketMaterialsPremiumHref,
} from '@/lib/materialRoutes'

const serviceKeys = [
  { key: 'reformas', link: '/reformas-integrales', catalogLink: null },
  { key: 'cocinas', link: '/cocinas-a-medida', catalogLink: null },
  { key: 'banos', link: '/banos-completos', catalogLink: null },
  { key: 'materiales', link: 'premium', catalogLink: 'catalog' },
]

export default function Servicios({ hideTitle = false }) {
  const t = useTranslations('servicios')
  const market = useActiveMarket()
  const imagesList = [
    images.services.reformas,
    images.services.cocinas,
    images.services.banos,
    images.services.materiales,
  ]

  /**
   * @param {{ key: string, link: string, catalogLink: string | null }} svc
   */
  const resolveService = (svc) => {
    if (svc.key !== 'materiales') return svc
    return {
      ...svc,
      link: marketMaterialsPremiumHref(market),
      catalogLink: marketCatalogHref(market),
    }
  }

  return (
    <section id="servicios" className="section-editorial bg-white">
      <div className="mx-auto max-w-7xl">
        {!hideTitle ? (
          <motion.h2
            className="mb-14 text-center font-heading text-3xl font-normal tracking-tight text-black md:mb-16 md:text-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeUp}
          >
            {t('title')}
          </motion.h2>
        ) : null}
        <motion.div
          className="grid gap-10 md:grid-cols-2 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={staggerContainer}
        >
          {serviceKeys.map((svc, index) => {
            const resolved = resolveService(svc)
            return (
              <motion.div key={svc.key} variants={staggerItem} className="group flex h-full flex-col">
                <Link href={resolved.link} className="relative mb-5 block aspect-[16/10] overflow-hidden">
                  <Image
                    src={imagesList[index]}
                    alt={t(svc.key)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </Link>
                <h3 className="mb-3 font-heading text-2xl font-normal tracking-tight text-black">
                  {t(svc.key)}
                </h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-600 md:text-base">
                  {t(`${svc.key}Desc`)}
                </p>
                <div className="flex flex-wrap gap-5">
                  <Link href={resolved.link} className="btn-discover text-[10px]">
                    {t('viewMore')}
                  </Link>
                  {resolved.catalogLink ? (
                    <Link href={resolved.catalogLink} className="btn-discover text-[10px] text-gray-500 border-gray-400">
                      {t('viewCatalog')}
                    </Link>
                  ) : null}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
