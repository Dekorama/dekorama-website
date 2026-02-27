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
}

const withNextIntl = require('next-intl/plugin')('./src/i18n/request.js')

module.exports = withNextIntl(nextConfig)
