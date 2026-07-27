import { NextResponse } from 'next/server'
import { marketFromCountryCode } from '@/lib/detectMarket'

/**
 * Geo hint for market auto-select.
 * Uses CDN/platform country headers when present (Vercel, Cloudflare).
 * @param {Request} request
 */
export async function GET(request) {
  const headers = request.headers
  const country =
    headers.get('x-vercel-ip-country') ||
    headers.get('cf-ipcountry') ||
    headers.get('x-country-code') ||
    headers.get('cloudfront-viewer-country') ||
    null

  const normalized =
    country && country !== 'XX' && country !== 'T1' ? country.toUpperCase() : null

  const market = marketFromCountryCode(normalized)

  return NextResponse.json(
    {
      country: normalized,
      market,
    },
    {
      headers: {
        'Cache-Control': 'private, no-store',
      },
    },
  )
}
