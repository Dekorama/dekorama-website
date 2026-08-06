'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import CatalogFilters from '@/components/catalog/CatalogFilters'
import CatalogCard from '@/components/catalog/CatalogCard'
import { Link } from '@/i18n/navigation'
import { useActiveMarket } from '@/lib/useActiveMarket'
import {
  filterCatalogs,
  getBrandsForCountry,
  isCatalogCountry,
  resolveBrandKey,
} from '@/data/catalogs'

/**
 * @typedef {import('@/data/catalogs').CatalogCountry} CatalogCountry
 *
 * @typedef {object} CatalogLibraryProps
 * @property {string} [initialQuery]
 */

/**
 * @param {CatalogLibraryProps} props
 */
export default function CatalogLibrary({ initialQuery = '' }) {
  const t = useTranslations('pages.catalogo')
  const tNav = useTranslations('nav')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeMarket = useActiveMarket()

  const queryFromUrl = searchParams.get('q')?.trim() || initialQuery
  const paisParam = searchParams.get('pais')
  const marcaParam = searchParams.get('marca')

  const [country, setCountry] = useState(/** @type {CatalogCountry} */ ('spain'))
  const [brandKey, setBrandKey] = useState(/** @type {string | null} */ (null))
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const fromUrl = isCatalogCountry(paisParam) ? paisParam : null
    const nextCountry = fromUrl ?? activeMarket
    setCountry(nextCountry)
    setBrandKey(resolveBrandKey(marcaParam, nextCountry))
    setHydrated(true)
  }, [paisParam, marcaParam, activeMarket])

  const syncUrl = useCallback(
    (/** @type {CatalogCountry} */ nextCountry, /** @type {string | null} */ nextBrand) => {
      const params = new URLSearchParams()
      params.set('pais', nextCountry)
      if (nextBrand) params.set('marca', nextBrand)
      if (queryFromUrl) params.set('q', queryFromUrl)
      const qs = params.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [pathname, queryFromUrl, router],
  )

  const handleCountryChange = useCallback(
    (/** @type {CatalogCountry} */ next) => {
      setCountry(next)
      setBrandKey(null)
      syncUrl(next, null)
    },
    [syncUrl],
  )

  const handleBrandChange = useCallback(
    (/** @type {string | null} */ next) => {
      setBrandKey(next)
      syncUrl(country, next)
    },
    [country, syncUrl],
  )

  const brands = useMemo(() => getBrandsForCountry(country), [country])

  const filtered = useMemo(
    () =>
      filterCatalogs({
        country,
        brandKey: hydrated ? brandKey : null,
        query: queryFromUrl,
      }),
    [brandKey, country, hydrated, queryFromUrl],
  )

  const countryLabel = (/** @type {CatalogCountry} */ id) =>
    id === 'spain' ? t('countries.spain') : t('countries.venezuela')

  return (
    <div>
      <CatalogFilters
        country={country}
        onCountryChange={handleCountryChange}
        brandKey={brandKey}
        onBrandChange={handleBrandChange}
        brands={brands}
        countryLabel={t('filters.country')}
        brandLabel={t('filters.brand')}
        spainLabel={t('countries.spain')}
        venezuelaLabel={t('countries.venezuela')}
        allBrandsLabel={t('filters.allBrands')}
        resultsLabel={t('filters.results', { count: filtered.length })}
      />

      {queryFromUrl ? (
        <p className="mb-8 flex flex-wrap items-center gap-3 text-sm text-gray-700">
          <span>{tNav('searchQueryLabel', { query: queryFromUrl })}</span>
          <Link
            href={`/catalogo?pais=${country}${brandKey ? `&marca=${brandKey}` : ''}`}
            className="underline underline-offset-4 hover:text-black"
          >
            {tNav('searchClear')}
          </Link>
        </p>
      ) : null}

      {filtered.length === 0 ? (
        <div className="py-12 text-center">
          <p className="mb-6 text-lg text-gray-600">{t('filters.empty')}</p>
          <button
            type="button"
            onClick={() => handleBrandChange(null)}
            className="btn-secondary inline-flex"
          >
            {t('filters.allBrands')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {filtered.map((catalog) => (
            <CatalogCard
              key={catalog.slug}
              catalog={catalog}
              countryLabel={countryLabel(catalog.country)}
              viewLabel={t('actions.view')}
              downloadLabel={t('actions.download')}
            />
          ))}
        </div>
      )}
    </div>
  )
}
