/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 año para imágenes optimizadas
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'dekorama.es' }],
        destination: 'https://www.dekoramagroup.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.dekorama.es' }],
        destination: 'https://www.dekoramagroup.com/:path*',
        permanent: true,
      },
      // Legacy city SEO category URLs → generic category pages
      {
        source: '/:locale/porcelanicos-malaga',
        destination: '/:locale/porcelanicos',
        permanent: true,
      },
      {
        source: '/:locale/venta-grifos-benalmadena',
        destination: '/:locale/griferia',
        permanent: true,
      },
      {
        source: '/:locale/mamparas-ducha-benalmadena',
        destination: '/:locale/mamparas',
        permanent: true,
      },
      {
        source: '/:locale/inodoros-suspendidos-benalmadena',
        destination: '/:locale/sanitarios',
        permanent: true,
      },
      {
        source: '/:locale/baneras-platos-ducha-benalmadena',
        destination: '/:locale/baneras-platos-ducha',
        permanent: true,
      },
    ]
  },
}

const withNextIntl = require('next-intl/plugin')('./src/i18n/request.js')

module.exports = withNextIntl(nextConfig)
