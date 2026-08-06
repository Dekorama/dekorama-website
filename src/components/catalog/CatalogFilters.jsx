'use client'

/**
 * @typedef {object} BrandOption
 * @property {string} brandKey
 * @property {string} brand
 *
 * @typedef {object} CatalogFiltersProps
 * @property {'spain' | 'venezuela'} country
 * @property {(country: 'spain' | 'venezuela') => void} onCountryChange
 * @property {string | null} brandKey
 * @property {(brandKey: string | null) => void} onBrandChange
 * @property {BrandOption[]} brands
 * @property {string} countryLabel
 * @property {string} brandLabel
 * @property {string} spainLabel
 * @property {string} venezuelaLabel
 * @property {string} allBrandsLabel
 * @property {string} resultsLabel
 */

/**
 * @param {CatalogFiltersProps} props
 */
export default function CatalogFilters({
  country,
  onCountryChange,
  brandKey,
  onBrandChange,
  brands,
  countryLabel,
  brandLabel,
  spainLabel,
  venezuelaLabel,
  allBrandsLabel,
  resultsLabel,
}) {
  const pillBase =
    'shrink-0 px-4 py-2 text-xs font-semibold tracking-widest uppercase border rounded-sm transition-colors duration-300'

  return (
    <div className="mb-10 space-y-6 md:mb-12">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          {countryLabel}
        </p>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {[
            { id: /** @type {const} */ ('spain'), label: spainLabel },
            { id: /** @type {const} */ ('venezuela'), label: venezuelaLabel },
          ].map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => onCountryChange(id)}
              className={`${pillBase} ${
                country === id
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 bg-white text-gray-600 hover:border-black hover:text-black'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          {brandLabel}
        </p>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          <button
            type="button"
            onClick={() => onBrandChange(null)}
            className={`${pillBase} ${
              brandKey === null
                ? 'border-black bg-black text-white'
                : 'border-gray-300 bg-white text-gray-600 hover:border-black hover:text-black'
            }`}
          >
            {allBrandsLabel}
          </button>
          {brands.map(({ brandKey: key, brand }) => (
            <button
              key={key}
              type="button"
              onClick={() => onBrandChange(key)}
              className={`${pillBase} ${
                brandKey === key
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 bg-white text-gray-600 hover:border-black hover:text-black'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-500">{resultsLabel}</p>
    </div>
  )
}
