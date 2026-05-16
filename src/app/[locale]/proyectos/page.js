'use client'

import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { projects } from '@/data/projects'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import Breadcrumb from '@/components/Breadcrumb'

export default function ProyectosPage() {
  const t = useTranslations('pages.proyectos')
  const tTypes = useTranslations('imageTypes')
  const tCommon = useTranslations('breadcrumb')
  const locale = useLocale()

  const breadcrumbItems = [
    { label: tCommon('home'), href: `/${locale}` },
    { label: t('h1'), href: null }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="section-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6 tracking-tight">
              {t('h1')}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('intro')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
            {projects.map((project, index) => {
              const title = locale === 'es' ? project.titleEs : project.titleEn
              const desc = locale === 'es' ? project.descEs : project.descEn
              const category = tTypes(project.category)
              const altText = locale === 'es' 
                ? `${category} ${title} - Dekorama Costa del Sol Málaga`
                : `${category} ${title} - Dekorama Costa del Sol Malaga`
              return (
                <div
                  key={index}
                  className="relative group overflow-hidden aspect-[3/4] bg-gray-50"
                >
                  <Image
                    src={project.src}
                    alt={altText}
                    fill
                    className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Overlay — slides up on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex flex-col justify-end p-6">
                    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-white/60 mb-2 border border-white/30 px-2 py-0.5 w-fit">
                      {category}
                    </span>
                    <h3 className="text-white font-bold text-2xl leading-snug mb-2 tracking-tight">
                      {title}
                    </h3>
                    <p className="text-white/75 text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link
              href="/#contacto"
              className="btn-primary inline-block"
            >
              {t('requestConsultation')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
