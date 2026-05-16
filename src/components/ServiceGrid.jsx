/**
 * ServiceGrid Component
 * 
 * Displays a 2x2 grid of service features/benefits with icons,
 * titles, and descriptions. Used for "Por qué elegir..." sections.
 * 
 * @param {Array} items - Array of feature items: [{ icon, title, description }]
 * @param {string} className - Additional CSS classes
 * 
 * @example
 * <ServiceGrid 
 *   items={[
 *     {
 *       icon: <SomeIcon />,
 *       title: 'Experiencia',
 *       description: 'Más de 12 años en el sector'
 *     },
 *     // ... more items
 *   ]}
 * />
 */
export default function ServiceGrid({ items = [], className = '' }) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`}>
      {items.map((item, index) => (
        <div 
          key={index}
          className="card"
        >
          {/* Icon */}
          {item.icon && (
            <div className="w-16 h-16 flex items-center justify-center mb-6 text-black">
              {item.icon}
            </div>
          )}

          {/* Title */}
          <h3 className="text-2xl font-semibold text-black mb-4">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  )
}
