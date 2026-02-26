import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import CookieBanner from '@/components/CookieBanner'
import GoogleTagManager from '@/components/GoogleTagManager'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { metaDescription, businessDescription } from '@/lib/site'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dekorama.es'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Dekorama | Reformas Integrales, Cocinas y Baños | Costa del Sol, Málaga',
    template: '%s | Dekorama',
  },
  description: metaDescription,
  keywords: [
    'reformas integrales Costa del Sol',
    'cocinas a medida Málaga',
    'baños de diseño Marbella',
    'reformas Málaga',
    'diseño de interiores Costa del Sol',
    'Dekorama',
  ],
  authors: [{ name: 'Dekorama', url: SITE_URL }],
  creator: 'Dekorama',
  publisher: 'Dekorama',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITE_URL,
    siteName: 'Dekorama',
    title: 'Dekorama | Reformas Integrales, Cocinas y Baños | Costa del Sol',
    description: metaDescription,
    images: [{ url: '/dekorama-favicon.png', width: 512, height: 512, alt: 'Dekorama' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dekorama | Reformas Integrales y Diseño | Costa del Sol',
    description: metaDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/dekorama-favicon.png',
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default function RootLayout({ children }) {
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Dekorama',
    description: businessDescription,
    url: SITE_URL,
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
    <html lang="es">
      <body className="min-h-screen bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <GoogleTagManager />
        <GoogleAnalytics />
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <WhatsAppButton />
      </body>
    </html>
  )
}
