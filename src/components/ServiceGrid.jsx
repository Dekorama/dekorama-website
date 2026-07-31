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
          className="border-t border-gray-200 pt-8"
          variants={staggerItem}
        >
          {item.icon ? (
            <div className="mb-5 flex h-12 w-12 items-center justify-center text-black">{item.icon}</div>
          ) : null}

          <h3 className="mb-3 text-xl font-semibold tracking-tight text-black">{item.title}</h3>

          <p className="leading-relaxed text-gray-600">{item.description}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
