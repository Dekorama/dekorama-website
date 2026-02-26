// Unsplash stock images - interior design, renovations
const UNSPLASH_BASE = 'https://images.unsplash.com'

export const images = {
  // Hero: una sola imagen limpia de interior/reforma
  hero: `${UNSPLASH_BASE}/photo-1600585154526-990dced4db0d?w=1200&q=80`,
  services: {
    reformas: `${UNSPLASH_BASE}/photo-1600585154340-be6161a56a0c?w=800&q=80`,
    cocinas: `${UNSPLASH_BASE}/photo-1556911220-bff31c812dba?w=800&q=80`,
    banos: `${UNSPLASH_BASE}/photo-1552321554-5fefe8c9ef14?w=800&q=80`,
    materiales: `${UNSPLASH_BASE}/photo-1615873968403-89e068629265?w=800&q=80`,
  },
  // Galería: solo tipo de proyecto, sin ubicaciones. Imágenes que cargan bien.
  gallery: [
    { src: `${UNSPLASH_BASE}/photo-1600585154340-be6161a56a0c?w=600&q=80`, tipo: 'Reforma integral' },
    { src: `${UNSPLASH_BASE}/photo-1600210492486-724fe5c67fb0?w=600&q=80`, tipo: 'Cocina a medida' },
    { src: `${UNSPLASH_BASE}/photo-1552321554-5fefe8c9ef14?w=600&q=80`, tipo: 'Baño completo' },
    { src: `${UNSPLASH_BASE}/photo-1600566753086-00f18fb6b3ea?w=600&q=80`, tipo: 'Reforma integral' },
    { src: `${UNSPLASH_BASE}/photo-1600585154526-990dced4db0d?w=600&q=80`, tipo: 'Diseño de interiores' },
    { src: `${UNSPLASH_BASE}/photo-1600573472592-401b489a3cdc?w=600&q=80`, tipo: 'Baño de diseño' },
  ],
}
