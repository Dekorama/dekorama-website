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
      canonical: isEn ? `${baseUrl}/en` : baseUrl,
      languages: { es: baseUrl, en: `${baseUrl}/en` },
    },
  }
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await Promise.resolve(params)
  const resolvedLocale = locale && ['es', 'en'].includes(locale) ? locale : 'es'
  const messages = (await import(`@/messages/${resolvedLocale}.json`)).default

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Dekorama',
    description: businessDescription,
    url: baseUrl,
    telephone: '+34628571537',
    email: 'info@dekorama.es',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Las Ventas, Av. Tivoli, 17, C.C., Local 5',
      addressLocality: 'Benalmádena',
      postalCode: '29631',
      addressRegion: 'Málaga',
      addressCountry: 'ES',
    },
  }

  return (
    <>
      <SetHtmlLang locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
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
