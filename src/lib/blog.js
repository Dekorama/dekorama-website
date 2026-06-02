import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import gfm from 'remark-gfm'
import html from 'remark-html'
import { BLOG_CATEGORIES } from '@/lib/blogCategories'

export { BLOG_CATEGORIES } from '@/lib/blogCategories'

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

/** @type {Record<string, string>} */
const SLUG_CATEGORY_MAP = {
  'cocina-abierta-salon-guia-completa': 'cocinas',
  'open-plan-kitchen-complete-guide': 'cocinas',
  'reformas-cocina-isla-marbella': 'cocinas',
  'kitchen-renovations-island-marbella': 'cocinas',
  'reforma-cocina-fuengirola-presupuesto-consejos': 'cocinas',
  'kitchen-renovation-fuengirola-cost-tips': 'cocinas',
  'banos-pequenos-ideas-ganar-espacio': 'banos',
  'small-bathrooms-ideas-maximize-space': 'banos',
  'mamparas-ducha-sin-marco-benalmadena': 'banos',
  'frameless-shower-screens-benalmadena': 'banos',
  'reforma-bano-marbella-precios-2026': 'costes',
  'marbella-bathroom-renovation-costs-2026': 'costes',
  'cuanto-cuesta-reformar-bano-completo-costa-del-sol': 'costes',
  'bathroom-renovation-cost-costa-del-sol': 'costes',
  'cuanto-cuesta-reformar-piso-villa-costa-del-sol': 'costes',
  'home-renovation-guide-expats-costa-del-sol': 'costes',
  'tarima-vs-porcelanico-madera': 'materiales',
  'hardwood-vs-wood-look-tile': 'materiales',
  'tendencias-porcelanico-2026': 'materiales',
  'porcelain-trends-2026': 'materiales',
  'porcelanico-efecto-cemento-tendencias-2026': 'materiales',
  'cement-effect-porcelain-tiles-trends-2026': 'materiales',
  'porcelanico-exterior-terraza-costa-sol': 'materiales',
  'porcelain-tiles-outdoor-terrace-costa-del-sol': 'materiales',
  'piscinas-azulejos-verano-2026': 'materiales',
  'pool-tiles-summer-2026': 'materiales',
  'reformar-apartamento-alquiler-vacacional-costa-del-sol': 'reformas',
  'renovate-holiday-rental-apartment-costa-del-sol': 'reformas',
  'como-planificar-reforma-integral-costa-del-sol': 'reformas',
  'how-to-renovate-costa-del-sol-expat': 'reformas',
}

/**
 * @param {string} slug
 * @returns {string}
 */
export function inferCategoryFromSlug(slug) {
  if (SLUG_CATEGORY_MAP[slug]) return SLUG_CATEGORY_MAP[slug]

  const s = slug.toLowerCase()
  if (/cuanto-cuesta|precios|presupuesto|costs?-/.test(s)) return 'costes'
  if (/cocina|kitchen/.test(s)) return 'cocinas'
  if (/bano|banos|bathroom|ducha|shower|mampara/.test(s)) return 'banos'
  if (/porcelanico|porcelain|tarima|tile|azulejo|piscina|pool|cement/.test(s)) return 'materiales'
  if (/reforma|reformar|renovat|planificar/.test(s)) return 'reformas'
  return 'reformas'
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function normalizeCategory(value, slug) {
  if (typeof value === 'string' && BLOG_CATEGORIES.includes(value)) return value
  return inferCategoryFromSlug(slug)
}

const FAQ_HEADING_RE = /^##\s+(?:FAQ|Frequently(?:\s+asked)?\s+questions?|Preguntas\s+[Ff]recuentes?)/i
const QUICK_ANSWER_HEADING_RE = /^##\s+(?:Respuesta rápida|Quick answer)/i

/**
 * @param {string} markdown
 * @returns {{ question: string, answer: string }[]}
 */
export function extractFaqs(markdown) {
  const faqs = []

  const sections = markdown.split(/^(?=##\s)/m)
  for (const section of sections) {
    if (!FAQ_HEADING_RE.test(section.split('\n')[0])) continue
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
 * @param {string} markdown
 * @returns {string}
 */
export function extractQuickAnswerFromBody(markdown) {
  const sections = markdown.split(/^(?=##\s)/m)
  for (const section of sections) {
    const heading = section.split('\n')[0]
    if (!QUICK_ANSWER_HEADING_RE.test(heading)) continue
    const body = section.split('\n').slice(1).join('\n').trim()
    return body
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/\[(.+?)\]\(.+?\)/g, '$1')
      .replace(/\n+/g, ' ')
      .trim()
  }
  return ''
}

/**
 * @param {string} markdown
 * @param {RegExp} headingRe
 * @returns {string}
 */
function stripSectionFromMarkdown(markdown, headingRe) {
  const sections = markdown.split(/^(?=##\s)/m)
  const kept = sections.filter((section) => {
    const firstLine = section.split('\n')[0]
    return !headingRe.test(firstLine)
  })
  return kept.join('').trim()
}

/**
 * @param {string} markdown
 * @returns {string}
 */
export function stripFaqAndQuickAnswerForRender(markdown) {
  let result = stripSectionFromMarkdown(markdown, FAQ_HEADING_RE)
  result = stripSectionFromMarkdown(result, QUICK_ANSWER_HEADING_RE)
  return result
}

/**
 * @param {string} locale
 * @param {string} slug
 * @returns {string | null}
 */
export function getPostLastModified(locale, slug) {
  const fullPath = path.join(BLOG_DIR, locale, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null
  const { data } = matter(fs.readFileSync(fullPath, 'utf-8'))
  if (data.lastReviewed) return data.lastReviewed
  if (data.date) return data.date
  return fs.statSync(fullPath).mtime.toISOString().split('T')[0]
}

/**
 * @typedef {Object} BlogPostSummary
 * @property {string} slug
 * @property {string} title
 * @property {string} excerpt
 * @property {string} date
 * @property {string} coverImage
 * @property {string} category
 */

/**
 * @param {string} locale - The locale ('es' or 'en')
 * @returns {BlogPostSummary[]}
 */
export function getPosts(locale = 'es') {
  const localeDir = path.join(BLOG_DIR, locale)
  if (!fs.existsSync(localeDir)) return []

  const dir = fs.readdirSync(localeDir)
  const posts = dir
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '')
      const fullPath = path.join(localeDir, filename)
      const content = fs.readFileSync(fullPath, 'utf-8')
      const { data } = matter(content)
      return {
        slug,
        title: data.title ?? '',
        excerpt: data.excerpt ?? '',
        date: data.date ?? '',
        coverImage: data.coverImage ?? '',
        category: normalizeCategory(data.category, slug),
      }
    })
  return posts.sort((a, b) => (b.date > a.date ? 1 : -1))
}

/**
 * @param {string} locale - The locale ('es' or 'en')
 * @returns {string[]} categories present in posts, in BLOG_CATEGORIES order
 */
export function getBlogCategories(locale = 'es') {
  const used = new Set(getPosts(locale).map((post) => post.category))
  return BLOG_CATEGORIES.filter((category) => used.has(category))
}

/**
 * @param {string} slug
 * @param {string} locale - The locale ('es' or 'en')
 * @returns {Promise<{
 *   slug: string,
 *   title: string,
 *   excerpt: string,
 *   date: string,
 *   lastReviewed: string,
 *   coverImage: string,
 *   keyAnswer: string,
 *   contentHtml: string,
 *   faqs: { question: string, answer: string }[],
 * } | null>}
 */
export async function getPostBySlug(slug, locale = 'es') {
  const fullPath = path.join(BLOG_DIR, locale, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null
  const content = fs.readFileSync(fullPath, 'utf-8')
  const { data, content: markdown } = matter(content)
  const faqs = extractFaqs(markdown)
  const keyAnswer =
    (typeof data.keyAnswer === 'string' && data.keyAnswer.trim()) ||
    extractQuickAnswerFromBody(markdown)
  const bodyForRender = stripFaqAndQuickAnswerForRender(markdown)
  const result = await remark().use(gfm).use(html).process(bodyForRender)
  const contentHtml = result.toString()
  const lastReviewed =
    (typeof data.lastReviewed === 'string' && data.lastReviewed) || data.date || ''

  return {
    slug,
    title: data.title ?? '',
    excerpt: data.excerpt ?? '',
    date: data.date ?? '',
    lastReviewed,
    coverImage: data.coverImage ?? '',
    keyAnswer,
    contentHtml,
    faqs,
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
