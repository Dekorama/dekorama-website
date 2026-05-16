'use client'

import { useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { projects } from '@/data/projects'
import { useTranslations, useLocale } from 'next-intl'

export default function Galeria() {
  const t = useTranslations('galeria')
  const tTypes = useTranslations('imageTypes')
  const locale = useLocale()
  
  // Mostramos solo los primeros 6 proyectos en la página principal
  const featuredProjects = projects.slice(0, 6)
  
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('fade-in')) {
          entry.target.classList.add('fade-in')
        }
      })
    }, observerOptions)
    const sections = document.querySelectorAll('#proyectos section > *')
    sections.forEach((el) => observer.observe(el))
    return () => sections.forEach((el) => observer.unobserve(el))
  }, [])

  return (
    <section id="proyectos" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-bg">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-16">
          {t('title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {featuredProjects.map((proyecto, index) => {
            const title = locale === 'es' ? proyecto.titleEs : proyecto.titleEn
            const desc = locale === 'es' ? proyecto.descEs : proyecto.descEn
            const category = tTypes(proyecto.category)
            const altText = locale === 'es' 
              ? `${category} ${title} - Dekorama Costa del Sol Málaga`
              : `${category} ${title} - Dekorama Costa del Sol Malaga`
            
            return (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[4/3]"
              >
                <Image
                  src={proyecto.src}
                  alt={altText}
                  fill
                  className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4">
                    <div className="text-sm font-semibold tracking-widest uppercase mb-2 opacity-80">{category}</div>
                    <div className="text-lg font-semibold mb-2">{title}</div>
                    <div className="text-sm opacity-90">{desc}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="text-center">
          <Link
            href="/proyectos"
            className="btn-secondary inline-block"
          >
            {t('viewAllProjects')}
          </Link>
        </div>
      </div>
    </section>
  )
}
