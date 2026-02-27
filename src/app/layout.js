import './globals.css'
import { Playfair_Display, DM_Sans } from 'next/font/google'

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

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-white font-sans antialiased text-black">
        {children}
      </body>
    </html>
  )
}
