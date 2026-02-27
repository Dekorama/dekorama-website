const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dekorama.es'

import { getPostSlugs } from '@/lib/blog'

const LOCALES = ['es', 'en']

const staticPaths = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/reformas-integrales', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/cocinas-a-medida', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/banos-completos', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/materiales-premium', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/catalogo', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/proyectos', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/politica-privacidad', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/aviso-legal', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' },
]

/** @returns {import('next').MetadataRoute.Sitemap} */
export default function sitemap() {
  const entries = []

  for (const locale of LOCALES) {
    const prefix = locale === 'es' ? '/es' : '/en'
    for (const { path, priority, changeFrequency } of staticPaths) {
      entries.push({
        url: `${BASE_URL}${prefix}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      })
    }
    
    // Get locale-specific slugs
    const slugs = getPostSlugs(locale)
    for (const slug of slugs) {
      entries.push({
        url: `${BASE_URL}${prefix}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return entries
}
