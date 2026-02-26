import Link from 'next/link'
import { businessDescription } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div>
              <div className="text-2xl font-bold">Dekorama</div>
              <p className="text-sm text-gray-500 mt-1">Razón social</p>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {businessDescription}
            </p>
            <p className="text-gray-400 text-sm">
              <span className="block font-medium text-gray-300 mt-2">Tienda:</span>
              Las Ventas, Avenida Tivoli, 17<br />
              Centro Comercial, Local 5<br />
              29631 Benalmádena, Málaga
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/reformas-integrales" className="hover:text-white transition-colors">
                  Reformas Integrales
                </Link>
              </li>
              <li>
                <Link href="/cocinas-a-medida" className="hover:text-white transition-colors">
                  Cocinas a medida
                </Link>
              </li>
              <li>
                <Link href="/banos-completos" className="hover:text-white transition-colors">
                  Baños completos
                </Link>
              </li>
              <li>
                <Link href="/materiales-premium" className="hover:text-white transition-colors">
                  Materiales premium
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#proceso" className="hover:text-white transition-colors">
                  Nuestro proceso
                </Link>
              </li>
              <li>
                <Link href="/proyectos" className="hover:text-white transition-colors">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="/#servicios" className="hover:text-white transition-colors">
                  Servicios
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="leading-relaxed">
                Las Ventas, Av. Tivoli, 17<br />
                C.C., Local 5, 29631 Benalmádena, Málaga
              </li>
              <li>
                <a href="tel:+34628571537" className="hover:text-white transition-colors">
                  +34 628 571 537
                </a>
              </li>
              <li>
                <a href="mailto:info@dekorama.es" className="hover:text-white transition-colors">
                  info@dekorama.es
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/grupodekorama"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-white transition-colors"
                aria-label="Instagram @grupodekorama"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div>© {new Date().getFullYear()} Dekorama. Todos los derechos reservados.</div>
          <div className="flex gap-6">
            <Link href="/politica-privacidad" className="hover:text-white transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/aviso-legal" className="hover:text-white transition-colors">
              Aviso Legal
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
