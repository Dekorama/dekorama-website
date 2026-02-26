const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dekorama.es'

const staticPages = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/reformas-integrales', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/cocinas-a-medida', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/banos-completos', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/materiales-premium', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/proyectos', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/politica-privacidad', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/aviso-legal', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' },
]

/** @returns {import('next').MetadataRoute.Sitemap} */
export default function sitemap() {
  return staticPages.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
