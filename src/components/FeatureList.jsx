/**
 * FeatureList Component
 * 
 * Displays a 2-column checklist of features/items. Used for 
 * "Qué incluye..." sections on service pages.
 * 
 * @param {Array} items - Array of feature strings
 * @param {boolean} grayBackground - Apply gray background to section
 * @param {string} className - Additional CSS classes
 * 
 * @example
 * <FeatureList 
 *   items={[
 *     'Diseño personalizado',
 *     'Materiales premium',
 *     'Instalación profesional',
 *     'Garantía de 5 años'
 *   ]}
 *   grayBackground
 * />
 */
export default function FeatureList({ items = [], grayBackground = false, className = '' }) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <div 
      className={`
        ${grayBackground ? 'bg-gray-50' : ''} 
        ${className}
      `}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            {/* Checkmark Icon */}
            <svg
              className="w-6 h-6 text-black flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>

            {/* Feature Text */}
            <span className="text-gray-700 leading-relaxed">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
