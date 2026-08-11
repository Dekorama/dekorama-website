import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'
import { pageAlternates } from '@/lib/seo'
import LegalDocument, { LegalSection, LegalList } from '@/components/LegalDocument'

export async function generateMetadata({ params }) {
  const { locale } = await Promise.resolve(params)
  const t = await getTranslations('legal.cookies')
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: true, follow: true },
    alternates: pageAlternates(locale, '/cookies'),
  }
}

export default async function CookiesPage({ params }) {
  const { locale } = await Promise.resolve(params)
  const t = await getTranslations('legal')
  const tc = await getTranslations('legal.cookies')
  const tFooter = await getTranslations('footer')
  const tCommon = await getTranslations('breadcrumb')
  const dateStr = new Date().toLocaleDateString(locale === 'en' ? 'en-GB' : 'es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <LegalDocument
      breadcrumbItems={[
        { label: tCommon('home'), href: `/${locale}` },
        { label: tc('title'), href: null },
      ]}
      title={tc('title')}
      lastUpdatedLabel={t('lastUpdated')}
      dateStr={dateStr}
      relatedTitle={t('relatedTitle')}
      relatedLinks={[
        { href: '/politica-privacidad', label: tFooter('privacy') },
        { href: '/aviso-legal', label: tFooter('legal') },
        { href: '/contacto', label: tFooter('contact') },
      ]}
    >
      <LegalSection title={tc('s1Title')}>
        <p>{tc('s1Body')}</p>
      </LegalSection>

      <LegalSection title={tc('s2Title')}>
        <p>{tc('s2Body')}</p>
      </LegalSection>

      <LegalSection title={tc('s3Title')}>
        <LegalList items={[tc('s3Item1'), tc('s3Item2'), tc('s3Item3')]} />
      </LegalSection>

      <LegalSection title={tc('s4Title')}>
        <p>{tc('s4Body')}</p>
        <p>{tc('s4Body2')}</p>
      </LegalSection>

      <LegalSection title={tc('s5Title')}>
        <p>{tc('s5Body')}</p>
      </LegalSection>

      <LegalSection title={tc('s6Title')}>
        <p>{tc('s6Body')}</p>
      </LegalSection>

      <LegalSection title={tc('s7Title')}>
        <p>{tc('s7Body')}</p>
      </LegalSection>
    </LegalDocument>
  )
}
