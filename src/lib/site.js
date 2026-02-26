/**
 * Descripción oficial del negocio.
 * Se usa en la web (meta, redes, footer y schema JSON-LD).
 * Para mantener sincronía con Google Business, copia este mismo texto en la descripción de tu ficha de Google.
 */
export const businessDescription =
  '¡Bienvenido a nuestra tienda de materiales para construcción y servicios de obras en la Costa del Sol! En Dekorama, ofrecemos una amplia selección de productos de alta calidad para tus proyectos. Encuentra porcelanicos, cerámicas, pavimentos, grifos, accesorios para baños, sanitarios, muebles, cocinas y mucho más. También contamos con servicios de obras, reformas y diseño de interiores. Nuestro equipo altamente experimentado está listo para brindarte asesoramiento personalizado y un servicio excepcional. Con mas de 20 años en la industria, somos líderes en la Costa del Sol, proporcionando productos de calidad y soluciones integrales. Confía en nosotros para cumplir tus expectativas.'

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
