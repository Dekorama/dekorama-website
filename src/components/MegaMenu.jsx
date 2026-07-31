'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Full-width mega menu panel for a nav category.
 * @param {{
 *   item: import('@/data/megaNav').MegaItem
 *   open: boolean
 *   onClose: () => void
 * }} props
 */
export default function MegaMenu({ item, open, onClose }) {
  const t = useTranslations('megaNav')

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute left-0 right-0 top-full z-40 border-b border-gray-200 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
          onMouseLeave={onClose}
          role="region"
          aria-label={t(item.labelKey)}
        >
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 sm:gap-10 sm:py-10 lg:grid-cols-12 lg:px-8 lg:py-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
              {item.columns.map((col) => (
                <div key={col.titleKey || col.links[0]?.href}>
                  {col.titleKey ? (
                    <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-900">
                      {t(col.titleKey)}
                    </p>
                  ) : null}
                  <ul className="space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.href + link.labelKey}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="text-sm text-gray-600 transition-colors hover:text-black"
                        >
                          {t(link.labelKey)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {item.blurbKey ? (
                <div className="max-w-xs sm:col-span-2 lg:col-span-1">
                  <p className="text-sm leading-relaxed text-gray-500">{t(item.blurbKey)}</p>
                </div>
              ) : null}
            </div>

            {item.featured ? (
              <Link
                href={item.featured.href}
                onClick={onClose}
                className="group relative aspect-[16/10] overflow-hidden sm:aspect-square lg:col-span-4"
              >
                <Image
                  src={item.featured.image}
                  alt={t(item.featured.altKey)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 320px"
                />
                <div className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/45" />
                <span className="absolute inset-0 flex items-center justify-center px-4 text-center text-xs font-semibold uppercase tracking-[0.22em] text-white">
                  {t(item.featured.labelKey)}
                </span>
              </Link>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
