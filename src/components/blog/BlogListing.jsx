'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { BLOG_CATEGORIES } from '@/lib/blogCategories'
import BlogFilters from '@/components/blog/BlogFilters'
import BlogPostCard from '@/components/blog/BlogPostCard'

const POSTS_PER_PAGE = 12
const SEARCH_DEBOUNCE_MS = 200

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
 * @typedef {Object} BlogListingProps
 * @property {BlogPostSummary[]} posts
 * @property {string} locale
 */

/**
 * @param {BlogPostSummary[]} posts
 * @param {'newest' | 'oldest'} sortOrder
 * @returns {BlogPostSummary[]}
 */
function sortPosts(posts, sortOrder) {
  return [...posts].sort((a, b) => {
    if (a.date === b.date) return 0
    if (sortOrder === 'newest') return b.date > a.date ? 1 : -1
    return a.date > b.date ? 1 : -1
  })
}

/**
 * @param {BlogPostSummary[]} posts
 * @param {string} query
 * @param {string | null} category
 * @returns {BlogPostSummary[]}
 */
function filterPosts(posts, query, category) {
  const normalizedQuery = query.trim().toLowerCase()

  return posts.filter((post) => {
    if (category && post.category !== category) return false
    if (!normalizedQuery) return true

    const haystack = `${post.title} ${post.excerpt}`.toLowerCase()
    return haystack.includes(normalizedQuery)
  })
}

/**
 * @param {BlogListingProps} props
 */
export default function BlogListing({ posts, locale }) {
  const t = useTranslations('blog')
  const [searchInput, setSearchInput] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)
  const [sortOrder, setSortOrder] = useState('newest')
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(searchInput)
    }, SEARCH_DEBOUNCE_MS)

    return () => window.clearTimeout(timer)
  }, [searchInput])

  useEffect(() => {
    setVisibleCount(POSTS_PER_PAGE)
  }, [debouncedQuery, activeCategory, sortOrder])

  const categories = useMemo(() => {
    const used = new Set(posts.map((post) => post.category))
    return BLOG_CATEGORIES.filter((category) => used.has(category))
  }, [posts])

  const filteredPosts = useMemo(
    () => sortPosts(filterPosts(posts, debouncedQuery, activeCategory), sortOrder),
    [posts, debouncedQuery, activeCategory, sortOrder],
  )

  const hasActiveFilters = debouncedQuery.trim().length > 0 || activeCategory !== null
  const showFeatured = !hasActiveFilters && filteredPosts.length > 0
  const gridPosts = showFeatured ? filteredPosts.slice(1) : filteredPosts
  const visiblePosts = gridPosts.slice(0, visibleCount)
  const hasMore = visibleCount < gridPosts.length

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(locale === 'en' ? 'en-GB' : 'es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getCategoryLabel = (category) => t(`categories.${category}`)

  const resultsLabel = activeCategory
    ? t('resultsCountFiltered', {
        count: filteredPosts.length,
        category: getCategoryLabel(activeCategory),
      })
    : t('resultsCount', { count: filteredPosts.length })

  const resetFilters = () => {
    setSearchInput('')
    setDebouncedQuery('')
    setActiveCategory(null)
    setSortOrder('newest')
  }

  return (
    <>
      <BlogFilters
        searchQuery={searchInput}
        onSearchChange={setSearchInput}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortOrder={sortOrder}
        onSortChange={(value) => setSortOrder(value === 'oldest' ? 'oldest' : 'newest')}
        categories={categories}
        resultsLabel={resultsLabel}
        searchPlaceholder={t('searchPlaceholder')}
        allCategoriesLabel={t('allCategories')}
        getCategoryLabel={getCategoryLabel}
        sortNewestLabel={t('sortNewest')}
        sortOldestLabel={t('sortOldest')}
      />

      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 md:py-24">
          <p className="text-lg text-gray-600 mb-6">{t('noResults')}</p>
          <button type="button" onClick={resetFilters} className="btn-secondary">
            {t('noResultsReset')}
          </button>
        </div>
      ) : (
        <>
          {showFeatured && (
            <div className="mb-10">
              <BlogPostCard
                post={filteredPosts[0]}
                locale={locale}
                readMoreLabel={t('readMore')}
                categoryLabel={getCategoryLabel(filteredPosts[0].category)}
                formatDate={formatDate}
                variant="featured"
              />
            </div>
          )}

          <div className="grid gap-10 md:grid-cols-2">
            {visiblePosts.map((post) => (
              <BlogPostCard
                key={post.slug}
                post={post}
                locale={locale}
                readMoreLabel={t('readMore')}
                categoryLabel={getCategoryLabel(post.category)}
                formatDate={formatDate}
              />
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-12">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + POSTS_PER_PAGE)}
                className="btn-secondary"
              >
                {t('loadMore')}
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}
