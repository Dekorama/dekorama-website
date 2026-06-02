import '../globals.css'
import { NextIntlClientProvider } from 'next-intl'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import CookieBanner from '@/components/CookieBanner'
import GoogleTagManager from '@/components/GoogleTagManager'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import SetHtmlLang from '@/components/SetHtmlLang'
import { metaDescription, businessDescription } from '@/lib/site'
import { baseUrl } from '@/lib/site'

const TITLES = {
  es: 'Dekorama | Materiales y Reformas Integrales, Cocinas y Baños | Costa del Sol, Málaga',
  en: "Dekorama | Materials & Full Renovations, Kitchens & Bathrooms | Costa del Sol, Málaga",
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
      url: isEn ? `${baseUrl}/en` : baseUrl,
      siteName: 'Dekorama',
      title,
      description,
      images: [{ url: '/dekorama-favicon.png', width: 512, height: 512, alt: 'Dekorama' }],
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true },
    alternates: {
      canonical: isEn ? `${baseUrl}/en` : `${baseUrl}/es`,
      languages: { es: `${baseUrl}/es`, en: `${baseUrl}/en` },
    },
  }
}

export async function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }]
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await Promise.resolve(params)
  const resolvedLocale = locale && ['es', 'en'].includes(locale) ? locale : 'es'
  const messages = (await import(`@/messages/${resolvedLocale}.json`)).default

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#business`,
    name: 'Dekorama',
    description: businessDescription,
    url: baseUrl,
    telephone: '+34628571537',
    email: 'info@dekoramagroup.com',
    priceRange: '€€',
    image: `${baseUrl}/dekorama-favicon.png`,
    logo: `${baseUrl}/dekorama-logo-cropped.svg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Avenida Tivoli, 17, Centro Comercial, Local 5',
      addressLocality: 'Benalmádena',
      postalCode: '29631',
      addressRegion: 'Málaga',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.5971,
      longitude: -4.5164,
    },
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
    sameAs: [
      'https://www.dekoramagroup.com',
      'https://www.instagram.com/grupodekorama',
      'https://www.facebook.com/grupodekorama',
      'https://es.pinterest.com/dekoramagroup',
    ],
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'Dekorama',
    url: baseUrl,
    description: businessDescription,
    publisher: {
      '@id': `${baseUrl}/#business`,
    },
    inLanguage: [resolvedLocale === 'en' ? 'en-GB' : 'es-ES'],
  }

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Dekorama',
    url: baseUrl,
    logo: `${baseUrl}/dekorama-logo-cropped.svg`,
    description: businessDescription,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+34-628-571-537',
      contactType: 'customer service',
      email: 'info@dekoramagroup.com',
      areaServed: ['ES', 'GB'],
      availableLanguage: ['Spanish', 'English'],
    },
    sameAs: [
      'https://www.instagram.com/grupodekorama',
      'https://www.facebook.com/grupodekorama',
      'https://es.pinterest.com/dekoramagroup',
    ],
  }

  return (
    <>
      <SetHtmlLang locale={locale} />
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
      <GoogleTagManager />
      <GoogleAnalytics />
      <NextIntlClientProvider locale={resolvedLocale} messages={messages}>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <WhatsAppButton />
      </NextIntlClientProvider>
    </>
  )
}
