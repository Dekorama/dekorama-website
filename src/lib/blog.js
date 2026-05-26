import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import gfm from 'remark-gfm'
import html from 'remark-html'

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

/**
 * Extracts FAQ Q&A pairs from markdown content.
 * Looks for ## FAQ / ## Frequently... / ## Preguntas Frecuentes sections,
 * then extracts ### Question + answer paragraph pairs.
 * @param {string} markdown
 * @returns {{ question: string, answer: string }[]}
 */
function extractFaqs(markdown) {
  const FAQ_HEADING_RE = /^##\s+(?:FAQ|Frequently(?:\s+asked)?\s+questions?|Preguntas\s+[Ff]recuentes?)/i
  const faqs = []

  // Split by ## headings to isolate FAQ sections
  const sections = markdown.split(/^(?=##\s)/m)
  for (const section of sections) {
    if (!FAQ_HEADING_RE.test(section.split('\n')[0])) continue
    // Split within FAQ section by ### headings
    const qaSections = section.split(/^(?=###\s)/m).slice(1)
    for (const qaSection of qaSections) {
      const lines = qaSection.split('\n')
      const question = lines[0].replace(/^###\s+/, '').trim()
      const rawAnswer = lines.slice(1).join('\n').trim()
      const answer = rawAnswer
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/\*(.+?)\*/g, '$1')
        .replace(/\[(.+?)\]\(.+?\)/g, '$1')
        .replace(/\n+/g, ' ')
        .trim()
      if (question && answer && answer.length > 10) {
        faqs.push({ question, answer })
      }
    }
  }
  return faqs
}

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
  const result = await remark().use(gfm).use(html).process(markdown)
  const contentHtml = result.toString()
  return {
    slug,
    title: data.title ?? '',
    excerpt: data.excerpt ?? '',
    date: data.date ?? '',
    coverImage: data.coverImage ?? '',
    contentHtml,
    faqs: extractFaqs(markdown),
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
