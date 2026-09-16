const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dekoramagroup.com'

const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Google-CloudVertexBot',
  'Applebot',
  'Applebot-Extended',
  'Amazonbot',
  'Meta-ExternalAgent',
  'DuckAssistBot',
  'MistralAI-User',
  'cohere-ai',
  'CCBot',
]

const DISALLOW = ['/api/', '/link-exchange']

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
