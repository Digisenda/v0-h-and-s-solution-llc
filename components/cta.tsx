import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section id="contacto" className="py-24 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-pretty">¿Listo para tu cita?</h2>

        <p className="text-lg opacity-90">Contacta con nosotros hoy para agendar tu servicio</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="tel:+12105550123"
            className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Llamar Ahora
            <ArrowRight size={20} />
          </Link>
          <Link
            href="mailto:plus@hssolutionllc.com"
            className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary-foreground hover:text-primary transition-colors"
          >
            Enviar Email
          </Link>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-primary-foreground/20">
          <div>
            <p className="text-sm opacity-75 mb-2">Teléfono</p>
            <p className="font-semibold text-lg">(210) 555-0123</p>
          </div>
          <div>
            <p className="text-sm opacity-75 mb-2">Email</p>
            <p className="font-semibold text-lg">plus@hssolutionllc.com</p>
          </div>
          <div>
            <p className="text-sm opacity-75 mb-2">Ubicación</p>
            <p className="font-semibold text-lg">San Antonio, TX</p>
          </div>
        </div>
      </div>
    </section>
  )
}
