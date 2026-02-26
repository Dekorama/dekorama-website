const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dekorama.es'

import { getPostSlugs } from '@/lib/blog'

const staticPages = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/reformas-integrales', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/cocinas-a-medida', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/banos-completos', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/materiales-premium', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/proyectos', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/politica-privacidad', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/aviso-legal', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' },
]

/** @returns {import('next').MetadataRoute.Sitemap} */
export default function sitemap() {
  const slugs = getPostSlugs()
  const blogPosts = slugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))
  const staticUrls = staticPages.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
  return [...staticUrls, ...blogPosts]
}
