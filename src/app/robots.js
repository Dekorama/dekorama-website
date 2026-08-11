const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dekoramagroup.com'

const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'ClaudeBot',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
]

const DISALLOW = ['/api/', '/partners', '/link-exchange']

/** @returns {import('next').MetadataRoute.Robots} */
export default function robots() {
  const defaultRule = {
    userAgent: '*',
    allow: '/',
    disallow: DISALLOW,
  }

  const aiRules = AI_CRAWLERS.map((userAgent) => ({
    userAgent,
    allow: '/',
    disallow: DISALLOW,
  }))

  return {
    rules: [defaultRule, ...aiRules],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
