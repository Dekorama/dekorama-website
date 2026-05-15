// Unsplash stock images - interior design, renovations
const UNSPLASH_BASE = 'https://images.unsplash.com'

export const images = {
  // Hero: villa mediterránea de lujo — Costa del Sol
  hero: `${UNSPLASH_BASE}/photo-1512917774080-9991f1c4c750?w=1200&q=80&fm=webp`,
  services: {
    reformas: `${UNSPLASH_BASE}/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=webp`,
    cocinas: `${UNSPLASH_BASE}/photo-1556911220-bff31c812dba?w=800&q=80&fm=webp`,
    banos: `${UNSPLASH_BASE}/photo-1552321554-5fefe8c9ef14?w=800&q=80&fm=webp`,
    materiales: `${UNSPLASH_BASE}/photo-1615873968403-89e068629265?w=800&q=80&fm=webp`,
  },
  materials: {
    showroom: '/icons/showroom.svg',
    grifos: '/icons/grifos.svg',
    mamparas: '/icons/mamparas.svg',
    sanitarios: '/icons/sanitarios.svg',
    baneras: '/icons/baneras.svg',
    porcelanicos: '/icons/porcelanicos.svg',
  },
  // Galería: solo tipo de proyecto, sin ubicaciones. Imágenes que cargan bien.
  gallery: [
    { src: `${UNSPLASH_BASE}/photo-1600585154340-be6161a56a0c?w=600&q=80&fm=webp`, tipo: 'Reforma integral' },
    { src: `${UNSPLASH_BASE}/photo-1600210492486-724fe5c67fb0?w=600&q=80&fm=webp`, tipo: 'Cocina a medida' },
    { src: `${UNSPLASH_BASE}/photo-1552321554-5fefe8c9ef14?w=600&q=80&fm=webp`, tipo: 'Baño completo' },
    { src: `${UNSPLASH_BASE}/photo-1600566753086-00f18fb6b3ea?w=600&q=80&fm=webp`, tipo: 'Reforma integral' },
    { src: `${UNSPLASH_BASE}/photo-1600585154526-990dced4db0d?w=600&q=80&fm=webp`, tipo: 'Diseño de interiores' },
    { src: `${UNSPLASH_BASE}/photo-1600573472592-401b489a3cdc?w=600&q=80&fm=webp`, tipo: 'Baño de diseño' },
  ],
}
