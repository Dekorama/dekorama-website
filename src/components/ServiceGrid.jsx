'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

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
    <motion.div 
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOptions}
      variants={staggerContainer}
    >
      {items.map((item, index) => (
        <motion.div 
          key={index}
          className="card"
          variants={staggerItem}
        >
          {/* Icon */}
          {item.icon && (
            <div className="w-16 h-16 flex items-center justify-center mb-6 text-black">
              {item.icon}
            </div>
          )}

          {/* Title */}
          <h3 className="text-2xl font-semibold text-black mb-4 tracking-tight">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}
