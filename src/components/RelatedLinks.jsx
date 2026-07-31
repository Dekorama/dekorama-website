'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

/**
 * Related links as editorial mini-hero tiles.
 * @param {{
 *   title?: string
 *   links?: Array<{ title: string, description?: string, href: string, image?: string, imageAlt?: string }>
 *   className?: string
 * }} props
 */
export default function RelatedLinks({ title, links = [], className = '' }) {
  if (!links || links.length === 0) return null

  return (
    <section className={`section-editorial bg-white ${className}`}>
      <div className="mx-auto max-w-7xl">
        {title ? (
          <h2 className="mb-10 text-center font-heading text-3xl font-normal tracking-tight text-black md:mb-14 md:text-4xl">
            {title}
          </h2>
        ) : null}

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={staggerContainer}
        >
          {links.map((link, index) => (
            <motion.div key={link.href || index} variants={staggerItem}>
              <Link href={link.href} className="group block">
                {link.image ? (
                  <div className="relative mb-5 aspect-[4/5] overflow-hidden bg-gray-100">
                    <Image
                      src={link.image}
                      alt={link.imageAlt || link.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    <span className="absolute bottom-5 left-0 right-0 px-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      {link.title}
                    </span>
                  </div>
                ) : (
                  <h3 className="mb-3 font-heading text-2xl font-normal tracking-tight text-black">
                    {link.title}
                  </h3>
                )}
                {link.description ? (
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">{link.description}</p>
                ) : null}
                <span className="btn-discover text-[10px]">Ver más</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
