'use client'

import { Link } from '@/i18n/navigation'
import { useActiveMarket } from '@/lib/useActiveMarket'
import {
  marketMaterialsHref,
  marketMaterialsPremiumHref,
} from '@/lib/materialRoutes'

/**
 * Materials nav link that follows active market.
 * @param {{
 *   children: import('react').ReactNode
 *   className?: string
 *   onClick?: () => void
 *   variant?: 'hub' | 'premium'
 * }} props
 */
export default function MarketMaterialsLink({
  children,
  className = '',
  onClick,
  variant = 'hub',
}) {
  const market = useActiveMarket()
  const href =
    variant === 'premium'
      ? marketMaterialsPremiumHref(market)
      : marketMaterialsHref(market)

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
