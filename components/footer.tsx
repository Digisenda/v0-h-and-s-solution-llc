import Link from "next/link"

export default function Footer() {
  const currentYear = 2024

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <div className="text-lg font-bold text-accent">H&S</div>
              </div>
              <div>
                <p className="font-bold text-primary">H&S Solutions</p>
                <p className="text-xs text-muted-foreground">Taller Automotriz</p>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm">Servicio automotriz profesional con garantía</p>
          </div>

          {/* Links */}
          <div>
            <p className="font-semibold text-foreground mb-4">Enlaces</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-accent transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-muted-foreground hover:text-accent transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/galeria" className="text-muted-foreground hover:text-accent transition-colors">
                  Galería
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-semibold text-foreground mb-4">Servicios</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/servicios" className="text-muted-foreground hover:text-accent transition-colors">
                  Ver todos
                </Link>
              </li>
              <li className="text-muted-foreground">Mantenimiento</li>
              <li className="text-muted-foreground">Reparación</li>
              <li className="text-muted-foreground">Diagnóstico</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-semibold text-foreground mb-4">Empresa</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-accent transition-colors">
                  Acerca de
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-muted-foreground hover:text-accent transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-accent transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-semibold text-foreground mb-4">Legal</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terminos" className="text-muted-foreground hover:text-accent transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-muted-foreground hover:text-accent transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:plus@hssolutionllc.com"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Contacto Legal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© {currentYear} H&S Solutions LLC. Todos los derechos reservados.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/terminos" className="hover:text-accent transition-colors">
                Términos
              </Link>
              <Link href="/privacidad" className="hover:text-accent transition-colors">
                Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
