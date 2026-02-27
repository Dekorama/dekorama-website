/**
 * Descripción oficial del negocio.
 * Se usa en la web (meta, redes, footer y schema JSON-LD).
 * Para mantener sincronía con Google Business, copia este mismo texto en la descripción de tu ficha de Google.
 */
export const businessDescription =
  '¡Bienvenido a Dekorama! Tienda de materiales para reforma y acabados en la Costa del Sol. Ofrecemos porcelánicos, cerámicas, pavimentos, grifería, platos de ducha, iluminación, mamparas y materiales de exterior, además de servicios de reformas integrales, cocinas y baños de diseño. Asesoramiento personalizado y más de 20 años en la industria. Productos de primeras marcas para que tu reforma supere expectativas.'

/** URL base del sitio para canonical, OG y sitemap */
export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dekorama.es'

const META_DESCRIPTION_MAX_LENGTH = 155

/**
 * Versión truncada para <meta name="description">, og:description y twitter:description.
 * Google muestra ~155 caracteres en el snippet; se corta sin partir palabras.
 */
function truncateForMeta(text, maxLength = META_DESCRIPTION_MAX_LENGTH) {
  if (text.length <= maxLength) return text
  const trimmed = text.slice(0, maxLength + 1)
  const lastSpace = trimmed.lastIndexOf(' ')
  const end = lastSpace > maxLength * 0.7 ? lastSpace : maxLength
  return trimmed.slice(0, end).trim() + '…'
}

export const metaDescription = truncateForMeta(businessDescription)

/**
 * Versión corta para el pie de página. Mantiene el mensaje principal sin saturar el footer.
 */
export const footerDescription =
  'Materiales para reforma y acabados en la Costa del Sol: porcelánicos, grifería, platos de ducha, iluminación, mamparas y más. Reformas integrales, cocinas y baños de diseño. Más de 20 años de experiencia.'
