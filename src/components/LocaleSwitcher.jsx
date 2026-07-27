'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { getSlugForLocale } from '@/lib/blogSlugMap'
import HeaderDropdown, {
  HeaderDropdownItem,
  GlobeIcon,
} from '@/components/HeaderDropdown'

const LOCALES = [
  { id: 'es', short: 'ES' },
  { id: 'en', short: 'EN' },
]

/**
 * Subtle language dropdown (globe + code).
 * Keeps hreflang/locale routing via next-intl; no SEO metadata changes.
 */
export default function LocaleSwitcher({ className = '', align = 'right', tone = 'light' }) {
  const t = useTranslations('localeSwitcher')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const getLocalizedPathname = (targetLocale) => {
    const blogPostMatch = pathname.match(/^\/blog\/(.+)$/)
    if (blogPostMatch) {
      const translatedSlug = getSlugForLocale(blogPostMatch[1], targetLocale, locale)
      return `/blog/${translatedSlug}`
    }
    return pathname
  }

  const active = LOCALES.find((item) => item.id === locale) ?? LOCALES[0]

  return (
    <HeaderDropdown
      label={t('ariaLabel')}
      icon={<GlobeIcon />}
      value={active.short}
      className={className}
      align={align}
      tone={tone}
    >
      {(close) =>
        LOCALES.map((item) => (
          <HeaderDropdownItem
            key={item.id}
            active={item.id === locale}
            onSelect={() => {
              close()
              if (item.id === locale) return
              router.replace(getLocalizedPathname(item.id), { locale: item.id })
            }}
          >
            {t(item.id)}
          </HeaderDropdownItem>
        ))
      }
    </HeaderDropdown>
  )
}
