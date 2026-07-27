'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useActiveMarket, marketHomeHref } from '@/lib/useActiveMarket'

/**
 * Logo link → Spain home or Venezuela landing by active market.
 */
export default function MarketHomeLink({ className = '' }) {
  const market = useActiveMarket()
  const href = marketHomeHref(market)

  return (
    <Link
      href={href}
      className={`flex items-center hover:opacity-80 transition-opacity shrink-0 ${className}`}
    >
      <Image
        src="/dekorama-logo-cropped.svg"
        alt="Dekorama"
        width={160}
        height={42}
        className="h-7 sm:h-8 md:h-9 w-auto object-contain"
        priority
      />
    </Link>
  )
}
