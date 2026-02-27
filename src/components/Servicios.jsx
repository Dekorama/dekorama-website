'use client'

import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { images } from '@/data/images'
import { useTranslations } from 'next-intl'

const serviceKeys = [
  { key: 'reformas', link: '/reformas-integrales', catalogLink: null },
  { key: 'cocinas', link: '/cocinas-a-medida', catalogLink: null },
  { key: 'banos', link: '/banos-completos', catalogLink: null },
  { key: 'materiales', link: '/materiales-premium', catalogLink: '/catalogo' },
]

export default function Servicios() {
  const t = useTranslations('servicios')
  const imagesList = [
    images.services.reformas,
    images.services.cocinas,
    images.services.banos,
    images.services.materiales,
  ]

  return (
    <section id="servicios" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-accent/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-16">
          {t('title')}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {serviceKeys.map((svc, index) =>
            svc.catalogLink ? (
              <div
                key={svc.key}
                className="group h-full flex flex-col overflow-hidden rounded-lg hover:shadow-xl transition-all duration-300 bg-white"
              >
                <Link href={svc.link} className="block flex-shrink-0">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={imagesList[index]}
                      alt={t(`${svc.key}`)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </Link>
                <div className="p-8 bg-white flex-1 flex flex-col">
                  <h3 className="text-2xl font-semibold text-black mb-3">{t(svc.key)}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed flex-1">{t(`${svc.key}Desc`)}</p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={svc.link}
                      className="text-black font-medium inline-flex items-center gap-2 hover:gap-4 transition-all"
                    >
                      {t('viewMore')}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      href={svc.catalogLink}
                      className="text-gray-600 font-medium inline-flex items-center gap-2 hover:text-black hover:gap-4 transition-all"
                    >
                      {t('viewCatalog')}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={svc.key}
                href={svc.link}
                className="group h-full flex flex-col cursor-pointer overflow-hidden rounded-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden flex-shrink-0">
                  <Image
                    src={imagesList[index]}
                    alt={t(svc.key)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8 bg-white flex-1 flex flex-col">
                  <h3 className="text-2xl font-semibold text-black mb-3">{t(svc.key)}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed flex-1">{t(`${svc.key}Desc`)}</p>
                  <span className="text-black font-medium inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                    {t('viewMore')}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  )
}
