/**
 * Artistic Tile–style mega-nav taxonomy for Dekorama.
 * Labels resolved via next-intl `megaNav.*` keys.
 */

/** @typedef {{ labelKey: string, href: string }} MegaLink */
/** @typedef {{ titleKey?: string, links: MegaLink[] }} MegaColumn */
/** @typedef {{
 *   id: string
 *   labelKey: string
 *   columns: MegaColumn[]
 *   featured?: { href: string, image: string, labelKey: string, altKey: string }
 *   blurbKey?: string
 * }} MegaItem */

/** @type {MegaItem[]} */
export const megaNavItems = [
  {
    id: 'material',
    labelKey: 'material',
    columns: [
      {
        titleKey: 'colMaterials',
        links: [
          { labelKey: 'porcelanicos', href: '/porcelanicos' },
          { labelKey: 'griferia', href: '/griferia' },
          { labelKey: 'mamparas', href: '/mamparas' },
          { labelKey: 'sanitarios', href: '/sanitarios' },
          { labelKey: 'baneras', href: '/baneras-platos-ducha' },
        ],
      },
      {
        titleKey: 'colExplore',
        links: [
          { labelKey: 'allMaterials', href: '/materiales' },
          { labelKey: 'catalog', href: '/catalogo' },
          { labelKey: 'premiumMaterials', href: '/materiales-premium' },
        ],
      },
    ],
    featured: {
      href: '/materiales',
      image: '/dekorama-showroom.jpeg',
      labelKey: 'browseByMaterial',
      altKey: 'featuredMaterialAlt',
    },
  },
  {
    id: 'espacios',
    labelKey: 'espacios',
    columns: [
      {
        titleKey: 'colSpaces',
        links: [
          { labelKey: 'kitchen', href: '/cocinas-a-medida' },
          { labelKey: 'bathroom', href: '/banos-completos' },
          { labelKey: 'fullRenovation', href: '/reformas-integrales' },
          { labelKey: 'showroom', href: '/materiales' },
          { labelKey: 'projects', href: '/proyectos' },
        ],
      },
    ],
    featured: {
      href: '/proyectos',
      image: '/projects/11327553-54c1-4dd1-971a-584a1a900c26.JPG',
      labelKey: 'browseBySpace',
      altKey: 'featuredSpaceAlt',
    },
  },
  {
    id: 'servicios',
    labelKey: 'servicios',
    columns: [
      {
        titleKey: 'colServices',
        links: [
          { labelKey: 'cocinas', href: '/cocinas-a-medida' },
          { labelKey: 'banos', href: '/banos-completos' },
          { labelKey: 'reformas', href: '/reformas-integrales' },
          { labelKey: 'allMaterials', href: '/materiales' },
          { labelKey: 'allServices', href: '/servicios' },
        ],
      },
    ],
  },
  {
    id: 'inspiracion',
    labelKey: 'inspiracion',
    columns: [
      {
        titleKey: 'colInspiration',
        links: [
          { labelKey: 'projects', href: '/proyectos' },
          { labelKey: 'blog', href: '/blog' },
          { labelKey: 'partners', href: '/partners' },
        ],
      },
    ],
    blurbKey: 'inspirationBlurb',
    featured: {
      href: '/proyectos',
      image: '/projects/e59151b0-a5f9-4aa9-af26-001acb7cf228.JPG',
      labelKey: 'browseProjects',
      altKey: 'featuredProjectsAlt',
    },
  },
  {
    id: 'ubicaciones',
    labelKey: 'ubicaciones',
    columns: [
      {
        titleKey: 'colLocations',
        links: [
          { labelKey: 'benalmadena', href: '/contacto' },
          { labelKey: 'marbella', href: '/reformas-marbella' },
          { labelKey: 'fuengirola', href: '/reformas-fuengirola' },
          { labelKey: 'estepona', href: '/reformas-estepona' },
          { labelKey: 'torremolinos', href: '/reformas-torremolinos' },
          { labelKey: 'caracas', href: '/reformas-caracas' },
          { labelKey: 'findLocation', href: '/contacto' },
        ],
      },
    ],
    blurbKey: 'locationsBlurb',
  },
]
