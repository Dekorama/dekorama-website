'use client'

import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { setStoredMarket } from '@/lib/marketPreference'
import { useActiveMarket, isVenezuelaPath } from '@/lib/useActiveMarket'
import HeaderDropdown, {
  HeaderDropdownItem,
  PinIcon,
} from '@/components/HeaderDropdown'

/**
 * Subtle country/market dropdown (pin + short code).
 * Preference + route only — does not change Spain SEO schema.
 */
export default function MarketSwitcher({ className = '', align = 'right' }) {
  const t = useTranslations('marketGate')
  const pathname = usePathname()
  const router = useRouter()
  const active = useActiveMarket()
  const triggerValue = active === 'venezuela' ? t('switchVenezuelaShort') : t('switchSpainShort')

  /**
   * @param {'spain' | 'venezuela'} next
   */
  const select = (next) => {
    setStoredMarket(next)
    if (next === 'venezuela' && !isVenezuelaPath(pathname)) {
      router.push('/reformas-caracas')
      return
    }
    if (next === 'spain' && isVenezuelaPath(pathname)) {
      router.push('/')
    }
  }

  return (
    <HeaderDropdown
      label={t('switcherAria')}
      icon={<PinIcon />}
      value={triggerValue}
      className={className}
      align={align}
    >
      {(close) => (
        <>
          <HeaderDropdownItem
            active={active === 'spain'}
            onSelect={() => {
              close()
              select('spain')
            }}
          >
            {t('spainLabel')}
          </HeaderDropdownItem>
          <HeaderDropdownItem
            active={active === 'venezuela'}
            onSelect={() => {
              close()
              select('venezuela')
            }}
          >
            {t('venezuelaLabel')}
          </HeaderDropdownItem>
        </>
      )}
    </HeaderDropdown>
  )
}
