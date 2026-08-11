import '../globals.css'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import CookieBanner from '@/components/CookieBanner'
import MarketGate from '@/components/MarketGate'
import GoogleTagManager from '@/components/GoogleTagManager'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { metaDescription, businessDescription, baseUrl, socialProfiles } from '@/lib/site'
import { markets, buildLocalBusinessJsonLd } from '@/lib/markets'
import { buildSiteNavigationJsonLd } from '@/lib/siteNavigation'
import { pageAlternates } from '@/lib/seo'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const TITLES = {
  es: 'Dekorama | Reformas Integrales, Cocinas y Baños | Costa del Sol',
  en: 'Dekorama | Full Renovations, Kitchens & Bathrooms | Costa del Sol',
}

const DESCRIPTIONS = {
  es: metaDescription,
  en: 'Welcome to Dekorama! Renovation and finish materials on the Costa del Sol. Porcelain tiles, ceramics, flooring, taps, shower trays, lighting, screens and exterior materials, plus full renovations and custom kitchens and bathrooms. Over 20 years in the industry.',
}

export async function generateMetadata({ params }) {
  const { locale } = await Promise.resolve(params)
  const isEn = locale === 'en'
  const title = TITLES[locale] || TITLES.es
  const description = DESCRIPTIONS[locale] || DESCRIPTIONS.es

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: '%s | Dekorama',
    },
    description,
    openGraph: {
      type: 'website',
      locale: isEn ? 'en_GB' : 'es_ES',
      url: isEn ? `${baseUrl}/en` : `${baseUrl}/es`,
      siteName: 'Dekorama',
      title,
      description,
      images: [{ url: '/dekorama-favicon.png', width: 512, height: 512, alt: 'Dekorama' }],
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true },
    alternates: pageAlternates(locale, ''),
  }
}

export async function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }]
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await Promise.resolve(params)
  const resolvedLocale = locale && ['es', 'en'].includes(locale) ? locale : 'es'
  const messages = (await import(`@/messages/${resolvedLocale}.json`)).default
  const spain = markets.spain
  const venezuela = markets.venezuela

  const localBusinessJsonLd = {
    ...buildLocalBusinessJsonLd(spain, { description: businessDescription }),
    url: resolvedLocale === 'en' ? `${baseUrl}/en` : `${baseUrl}/es`,
    priceRange: '€€',
    image: `${baseUrl}/dekorama-favicon.png`,
    logo: `${baseUrl}/dekorama-logo-cropped.svg`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '14:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '53',
      bestRating: '5',
    },
    sameAs: socialProfiles,
    parentOrganization: { '@id': `${baseUrl}/#organization` },
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'Dekorama',
    alternateName: ['Dekorama Group', 'Grupo Dekorama'],
    url: resolvedLocale === 'en' ? `${baseUrl}/en` : `${baseUrl}/es`,
    description: businessDescription,
    inLanguage: [resolvedLocale === 'en' ? 'en-GB' : 'es-ES'],
    publisher: { '@id': `${baseUrl}/#organization` },
    about: { '@id': spain.businessId },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/${resolvedLocale}/catalogo?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Dekorama',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/dekorama-logo-cropped.svg`,
    },
    image: `${baseUrl}/dekorama-favicon.png`,
    description: businessDescription,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: spain.telephone,
        contactType: 'customer service',
        email: spain.email,
        areaServed: spain.areaServed,
        availableLanguage: ['Spanish', 'English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: venezuela.telephone,
        contactType: 'customer service',
        email: venezuela.email,
        areaServed: venezuela.areaServed,
        availableLanguage: ['Spanish', 'English'],
        url: `${baseUrl}/es/contacto-caracas`,
      },
    ],
    department: [
      { '@id': spain.businessId },
      { '@id': venezuela.businessId },
    ],
    sameAs: socialProfiles,
  }

  const siteNavigationJsonLd = buildSiteNavigationJsonLd(
    /** @type {'es' | 'en'} */ (resolvedLocale),
  )

  return (
    <html
      lang={resolvedLocale}
      className={`${playfair.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white font-sans antialiased text-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationJsonLd) }}
        />
        <GoogleTagManager />
        <GoogleAnalytics />
        <NextIntlClientProvider locale={resolvedLocale} messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
          <WhatsAppButton />
          <MarketGate />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
