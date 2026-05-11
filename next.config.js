/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
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
    ]
  },
}

const withNextIntl = require('next-intl/plugin')('./src/i18n/request.js')

module.exports = withNextIntl(nextConfig)
