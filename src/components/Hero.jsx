'use client'

import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { images } from '@/data/images'
import { useTranslations } from 'next-intl'

export default function Hero() {
  const t = useTranslations('hero')
  return (
    <section id="hero" className="pt-20 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tight">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('subtitle')}
            </p>
            <p className="text-sm font-medium text-accent">
              {t('experience')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/#contacto"
                className="btn-primary text-center"
              >
                {t('requestConsultation')}
              </Link>
              <Link
                href="/proyectos"
                className="btn-secondary text-center"
              >
                {t('viewProjects')}
              </Link>
            </div>
          </div>

          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={images.hero}
              alt="Villa de lujo reformada en la Costa del Sol - Benalmádena, Marbella, Málaga"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
