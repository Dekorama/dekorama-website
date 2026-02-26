import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

/**
 * @returns {{ slug: string, title: string, excerpt: string, date: string, coverImage: string }[]}
 */
export function getPosts() {
  const dir = fs.readdirSync(BLOG_DIR)
  const posts = dir
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const fullPath = path.join(BLOG_DIR, filename)
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
 * @returns {{ slug: string, title: string, excerpt: string, date: string, coverImage: string, contentHtml: string } | null}
 */
export async function getPostBySlug(slug) {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`)
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
 * @returns {string[]} all slugs for generateStaticParams
 */
export function getPostSlugs() {
  const dir = fs.readdirSync(BLOG_DIR)
  return dir.filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''))
}
