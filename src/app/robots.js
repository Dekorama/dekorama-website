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

/** @returns {import('next').MetadataRoute.Robots} */
export default function robots() {
  const defaultRule = {
    userAgent: '*',
    allow: '/',
    disallow: ['/api/'],
  }

  const aiRules = AI_CRAWLERS.map((userAgent) => ({
    userAgent,
    allow: '/',
    disallow: ['/api/'],
  }))

  return {
    rules: [defaultRule, ...aiRules],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
