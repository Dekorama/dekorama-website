import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import CookieBanner from '@/components/CookieBanner'
import GoogleTagManager from '@/components/GoogleTagManager'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dekorama.es'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Dekorama | Reformas Integrales, Cocinas y Baños | Costa del Sol, Málaga',
    template: '%s | Dekorama',
  },
  description:
    'Reformas integrales, cocinas a medida y baños de diseño en la Costa del Sol. Presupuesto sin compromiso. Visita gratuita. Expertos en Málaga y Marbella.',
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
    description:
      'Reformas integrales, cocinas a medida y baños de diseño en la Costa del Sol. Presupuesto sin compromiso. Visita gratuita.',
    images: [{ url: '/dekorama-favicon.png', width: 512, height: 512, alt: 'Dekorama' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dekorama | Reformas Integrales y Diseño | Costa del Sol',
    description: 'Reformas integrales, cocinas y baños de diseño. Costa del Sol, Málaga.',
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
  return (
    <html lang="es">
      <body className="min-h-screen bg-white">
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
