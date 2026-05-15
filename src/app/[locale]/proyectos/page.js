'use client'

import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { projects } from '@/data/projects'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'

export default function ProyectosPage() {
  const t = useTranslations('pages.proyectos')
  const tTypes = useTranslations('imageTypes')
  const locale = useLocale()

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="text-gray-500 hover:text-black transition-colors inline-flex items-center gap-2 mb-10 text-sm tracking-wide uppercase"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('backHome')}
          </Link>

          <div className="max-w-3xl mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-black leading-tight mb-6">
              {t('h1')}
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              {t('intro')}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
            {projects.map((project, index) => {
              const num = String(index + 1).padStart(2, '0')
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
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Number badge — always visible */}
                  <div className="absolute top-4 left-4 z-10 text-white/60 text-xs font-mono tracking-widest select-none">
                    {num}
                  </div>

                  {/* Overlay — slides up on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col justify-end p-6">
                    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-white/60 mb-2 border border-white/30 px-2 py-0.5 w-fit">
                      {category}
                    </span>
                    <h3 className="text-white font-bold text-xl leading-snug mb-2">
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
              className="inline-block px-10 py-4 bg-black text-white text-sm font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors duration-300"
            >
              {t('requestConsultation')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
