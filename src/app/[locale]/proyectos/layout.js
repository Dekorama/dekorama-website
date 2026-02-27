import { baseUrl } from '@/lib/site'

export const metadata = {
  title: 'Proyectos',
  description:
    'Proyectos de reformas integrales, cocinas y baños realizados por Dekorama en la Costa del Sol. Diseño de interiores en Málaga y Marbella.',
  openGraph: {
    title: 'Proyectos | Dekorama Costa del Sol',
    description: 'Reformas y proyectos de diseño de interiores realizados por Dekorama.',
    url: '/proyectos',
  },
  alternates: { canonical: `${baseUrl}/proyectos` },
}

export default function ProyectosLayout({ children }) {
  return children
}
