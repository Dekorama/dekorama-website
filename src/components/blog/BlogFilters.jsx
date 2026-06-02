'use client'

/**
 * @typedef {Object} BlogFiltersProps
 * @property {string} searchQuery
 * @property {(value: string) => void} onSearchChange
 * @property {string | null} activeCategory
 * @property {(category: string | null) => void} onCategoryChange
 * @property {'newest' | 'oldest'} sortOrder
 * @property {(order: 'newest' | 'oldest') => void} onSortChange
 * @property {string[]} categories
 * @property {string} resultsLabel
 * @property {string} searchPlaceholder
 * @property {string} allCategoriesLabel
 * @property {(category: string) => string} getCategoryLabel
 * @property {string} sortNewestLabel
 * @property {string} sortOldestLabel
 */

/**
 * @param {BlogFiltersProps} props
 */
export default function BlogFilters({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
  categories,
  resultsLabel,
  searchPlaceholder,
  allCategoriesLabel,
  getCategoryLabel,
  sortNewestLabel,
  sortOldestLabel,
}) {
  const pillBase =
    'shrink-0 px-4 py-2 text-xs font-semibold tracking-widest uppercase border rounded-sm transition-colors duration-300'

  return (
    <div className="mb-10 md:mb-12 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-md w-full">
          <label htmlFor="blog-search" className="sr-only">
            {searchPlaceholder}
          </label>
          <svg
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            id="blog-search"
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            className="input-field pl-12"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="blog-sort" className="sr-only">
            {sortNewestLabel}
          </label>
          <select
            id="blog-sort"
            value={sortOrder}
            onChange={(event) => onSortChange(event.target.value)}
            className="input-select py-3 pl-4 text-sm w-full md:w-auto md:min-w-[180px]"
          >
            <option value="newest">{sortNewestLabel}</option>
            <option value="oldest">{sortOldestLabel}</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        <button
          type="button"
          onClick={() => onCategoryChange(null)}
          className={`${pillBase} ${
            activeCategory === null
              ? 'bg-black text-white border-black'
              : 'bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black'
          }`}
        >
          {allCategoriesLabel}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`${pillBase} ${
              activeCategory === category
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black'
            }`}
          >
            {getCategoryLabel(category)}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500">{resultsLabel}</p>
    </div>
  )
}
