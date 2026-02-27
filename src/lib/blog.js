import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

/**
 * @param {string} locale - The locale ('es' or 'en')
 * @returns {{ slug: string, title: string, excerpt: string, date: string, coverImage: string }[]}
 */
export function getPosts(locale = 'es') {
  const localeDir = path.join(BLOG_DIR, locale)
  if (!fs.existsSync(localeDir)) return []
  
  const dir = fs.readdirSync(localeDir)
  const posts = dir
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const fullPath = path.join(localeDir, filename)
      const content = fs.readFileSync(fullPath, 'utf-8')
      const { data } = matter(content)
      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title ?? '',
        excerpt: data.excerpt ?? '',
        date: data.date ?? '',
        coverImage: data.coverImage ?? '',
      }
    })
  return posts.sort((a, b) => (b.date > a.date ? 1 : -1))
}

/**
 * @param {string} slug
 * @param {string} locale - The locale ('es' or 'en')
 * @returns {{ slug: string, title: string, excerpt: string, date: string, coverImage: string, contentHtml: string } | null}
 */
export async function getPostBySlug(slug, locale = 'es') {
  const fullPath = path.join(BLOG_DIR, locale, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null
  const content = fs.readFileSync(fullPath, 'utf-8')
  const { data, content: markdown } = matter(content)
  const result = await remark().use(html).process(markdown)
  const contentHtml = result.toString()
  return {
    slug,
    title: data.title ?? '',
    excerpt: data.excerpt ?? '',
    date: data.date ?? '',
    coverImage: data.coverImage ?? '',
    contentHtml,
  }
}

/**
 * @param {string} locale - The locale ('es' or 'en')
 * @returns {string[]} all slugs for generateStaticParams
 */
export function getPostSlugs(locale = 'es') {
  const localeDir = path.join(BLOG_DIR, locale)
  if (!fs.existsSync(localeDir)) return []
  
  const dir = fs.readdirSync(localeDir)
  return dir.filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''))
}
