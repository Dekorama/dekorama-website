/**
 * Shared product-page image paths + related-link helpers.
 */

export const productImages = {
  grifos: '/images/products/grifos/hero.png',
  mamparas: '/images/products/mamparas/hero.png',
  sanitarios: '/images/products/sanitarios/hero.png',
  baneras: '/images/products/baneras/hero.png',
  materiales: '/images/porcelanicos/materiales.png',
  banos: '/images/porcelanicos/banos.png',
  cocinas: '/images/porcelanicos/cocinas.png',
  porcelanicos: '/images/porcelanicos/hero.png',
}

/**
 * @param {'es' | 'en'} locale
 * @param {Array<'banos' | 'materiales' | 'mamparas' | 'grifos' | 'baneras' | 'sanitarios' | 'porcelanicos' | 'cocinas'>} keys
 */
export function buildRelatedLinks(locale, keys) {
  const isEs = locale === 'es'
  /** @type {Record<string, { title: string, description: string, href: string, image: string, imageAlt: string }>} */
  const catalog = {
    banos: {
      title: isEs ? 'Baños Completos' : 'Complete Bathrooms',
      description: isEs
        ? 'Reforma integral de tu baño con acabados premium'
        : 'Complete bathroom renovation with premium finishes',
      href: '/banos-completos',
      image: productImages.banos,
      imageAlt: isEs ? 'Baño completo' : 'Complete bathroom',
    },
    materiales: {
      title: isEs ? 'Materiales Premium' : 'Premium Materials',
      description: isEs
        ? 'Grifería, sanitarios, iluminación y más'
        : 'Taps, sanitaryware, lighting and more',
      href: '/materiales-premium',
      image: productImages.materiales,
      imageAlt: isEs ? 'Materiales premium' : 'Premium materials',
    },
    mamparas: {
      title: isEs ? 'Mamparas de Ducha' : 'Shower Screens',
      description: isEs
        ? 'Profiltek, Spazia, Castel. Vidrio templado 8mm'
        : 'Profiltek, Spazia, Castel. 8mm tempered glass',
      href: '/mamparas',
      image: productImages.mamparas,
      imageAlt: isEs ? 'Mamparas de ducha' : 'Shower screens',
    },
    grifos: {
      title: isEs ? 'Grifería' : 'Taps',
      description: isEs
        ? 'Cristina, Neve, Tres, Gessi. Múltiples acabados'
        : 'Cristina, Neve, Tres, Gessi. Multiple finishes',
      href: '/griferia',
      image: productImages.grifos,
      imageAlt: isEs ? 'Grifería premium' : 'Premium taps',
    },
    baneras: {
      title: isEs ? 'Bañeras y Platos' : 'Baths & Trays',
      description: isEs
        ? 'Roca, Hidrobox, Hidronatur. Todas las medidas'
        : 'Roca, Hidrobox, Hidronatur. All sizes',
      href: '/baneras-platos-ducha',
      image: productImages.baneras,
      imageAlt: isEs ? 'Bañeras y platos' : 'Baths and trays',
    },
    sanitarios: {
      title: isEs ? 'Sanitarios' : 'Sanitaryware',
      description: isEs
        ? 'Inodoros Geberit, Tece, Duravit, Villeroy & Boch'
        : 'Geberit, Tece, Duravit, Villeroy & Boch toilets',
      href: '/sanitarios',
      image: productImages.sanitarios,
      imageAlt: isEs ? 'Sanitarios' : 'Sanitaryware',
    },
    porcelanicos: {
      title: isEs ? 'Porcelánicos' : 'Porcelain tiles',
      description: isEs
        ? 'Suelos y revestimientos de primeras marcas'
        : 'Floor and wall tiles from leading brands',
      href: '/porcelanicos',
      image: productImages.porcelanicos,
      imageAlt: isEs ? 'Porcelánicos' : 'Porcelain tiles',
    },
    cocinas: {
      title: isEs ? 'Cocinas a Medida' : 'Custom Kitchens',
      description: isEs
        ? 'Diseños exclusivos con materiales de calidad'
        : 'Exclusive designs with quality materials',
      href: '/cocinas-a-medida',
      image: productImages.cocinas,
      imageAlt: isEs ? 'Cocina a medida' : 'Custom kitchen',
    },
  }

  return keys.map((key) => catalog[key]).filter(Boolean)
}
