'use client'

import { Link } from '@/i18n/navigation'
import { useActiveMarket, marketContactHref } from '@/lib/useActiveMarket'

/**
 * Contact nav link that follows active market (ES → /contacto, VE → /contacto-caracas).
 * @param {{
 *   children: import('react').ReactNode
 *   className?: string
 *   onClick?: () => void
 * }} props
 */
export default function MarketContactLink({ children, className = '', onClick }) {
  const market = useActiveMarket()
  const href = marketContactHref(market)

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
