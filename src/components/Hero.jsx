'use client'

import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { images } from '@/data/images'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { heroText, fadeIn, viewportOptions } from '@/lib/animations'

export default function Hero() {
  const t = useTranslations('hero')
  return (
    <section id="hero" className="pt-20 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tight"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              variants={heroText}
            >
              {t('title')}
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 leading-relaxed"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              variants={heroText}
              transition={{ delay: 0.2 }}
            >
              {t('subtitle')}
            </motion.p>
            <motion.p 
              className="text-sm font-medium text-accent"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              variants={heroText}
              transition={{ delay: 0.3 }}
            >
              {t('experience')}
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              variants={heroText}
              transition={{ delay: 0.4 }}
            >
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
            </motion.div>
          </div>

          <motion.div 
            className="relative h-96 md:h-[500px] rounded-lg overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeIn}
            transition={{ delay: 0.3 }}
          >
            <Image
              src={images.hero}
              alt="Villa de lujo reformada en la Costa del Sol - Benalmádena, Marbella, Málaga"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
