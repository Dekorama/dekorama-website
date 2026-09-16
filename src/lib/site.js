/**
 * Descripción oficial del negocio.
 * Se usa en la web (meta, redes, footer y schema JSON-LD).
 * Para mantener sincronía con Google Business, copia este mismo texto en la descripción de tu ficha de Google.
 */
export const businessDescription =
  '¡Bienvenido a Dekorama! Tienda de materiales para reforma y acabados en la Costa del Sol. Ofrecemos porcelánicos, cerámicas, pavimentos, grifería, platos de ducha, iluminación, mamparas y materiales de exterior, además de servicios de reformas integrales, cocinas y baños de diseño. Asesoramiento personalizado y más de 12 años en la industria. Productos de primeras marcas para que tu reforma supere expectativas.'

/**
 * Descripción de la Organization (no de la tienda de España).
 * Nombra los DOS mercados para que buscadores y asistentes IA asocien
 * la marca tanto a la Costa del Sol como a Caracas, Venezuela.
 */
export const organizationDescription =
  'Dekorama (Grupo Dekorama) es una empresa de materiales para reforma, acabados y reformas integrales con operación en dos países: showroom y tienda en Benalmádena, Málaga (Costa del Sol, España) y operación propia en Caracas, Venezuela (showroom con cita previa). Porcelánicos, cerámicas, pavimentos, grifería, platos de ducha, iluminación y mamparas, además de reformas integrales, cocinas a medida y baños completos.'

/** Descripción del negocio en Caracas (LocalBusiness Venezuela). */
export const venezuelaBusinessDescription =
  'Dekorama Caracas: suministro de materiales de acabado de alta calidad y ejecución de reformas integrales en Caracas, Venezuela. Porcelánicos, grifería, sanitarios, mamparas, cocinas a medida y baños completos. Más de 20 años en el mercado venezolano. Showroom con cita previa. Altamira, Las Mercedes, La Castellana, Chacao, Baruta, El Hatillo, La Trinidad, Los Naranjos y Boleíta.'

/** URL base del sitio para canonical, OG y sitemap */
export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dekoramagroup.com'

/** Official social profiles (Organization / LocalBusiness sameAs + footer). */
export const socialProfiles = [
  'https://www.instagram.com/grupodekorama',
  'https://www.facebook.com/grupodekorama',
  'https://www.pinterest.com/dekoramagroup',
]

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
  'Materiales para reforma y acabados en la Costa del Sol: porcelánicos, grifería, platos de ducha, iluminación, mamparas y más. Reformas integrales, cocinas y baños de diseño. Más de 12 años de experiencia.'
