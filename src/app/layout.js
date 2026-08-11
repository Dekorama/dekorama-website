import { baseUrl } from '@/lib/site'

export const metadata = {
  metadataBase: new URL(baseUrl),
  icons: {
    icon: '/dekorama-favicon.png',
    apple: '/dekorama-favicon.png',
    shortcut: '/dekorama-favicon.png',
  },
}

/**
 * Root layout is a passthrough so [locale] can own <html lang>.
 * @param {{ children: React.ReactNode }} props
 */
export default function RootLayout({ children }) {
  return children
}
