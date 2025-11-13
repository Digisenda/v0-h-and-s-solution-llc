import { getAboutInfo } from "@/lib/content-loader"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Acerca de Nosotros | H&S Solution LLC",
  description:
    "Conoce la historia, equipo y valores de H&S Solution LLC, tu taller automotriz de confianza en San Antonio.",
}

export default async function AboutPage() {
  const about = await getAboutInfo()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {about?.title || "Acerca de H&S Solution LLC"}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {about?.subtitle || "Expertos en soluciones automotrices desde 2010"}
              </p>
            </div>
            {about?.mainImage && (
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={about.mainImage || "/placeholder.svg"}
                  alt="H&S Solution LLC"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Story Section */}
      {about?.story && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8">Nuestra Historia</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">{about.story}</div>
          </div>
        </section>
      )}

      {/* Mission, Vision, Values */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Mission */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-primary mb-4">Misión</h3>
              <p className="text-muted-foreground leading-relaxed">
                {about?.mission ||
                  "Proporcionar servicios automotrices de calidad superior con profesionalismo y dedicación."}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-primary mb-4">Visión</h3>
              <p className="text-muted-foreground leading-relaxed">
                {about?.vision ||
                  "Ser el taller automotriz líder en San Antonio, reconocido por excelencia y confianza."}
              </p>
            </div>

            {/* Values */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-primary mb-4">Valores</h3>
              <ul className="space-y-3">
                {about?.values?.map((value, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary font-bold mr-2">✓</span>
                    <span className="text-muted-foreground">{value}</span>
                  </li>
                )) || (
                  <>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">✓</span>
                      <span className="text-muted-foreground">Profesionalismo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">✓</span>
                      <span className="text-muted-foreground">Calidad</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">✓</span>
                      <span className="text-muted-foreground">Confianza</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Nuestro Equipo</h2>
            <p className="text-xl text-muted-foreground">
              Profesionales certificados y comprometidos con la excelencia
            </p>
          </div>

          {/* Static team data */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-secondary/10 to-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="relative h-64 w-full overflow-hidden">
                <Image src="/placeholder.svg" alt="John Doe" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground">John Doe</h3>
                <p className="text-primary font-semibold mb-2">Mecánico Principal</p>
                <p className="text-sm text-muted-foreground mb-4">Automotriz</p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  John es un mecánico con más de 15 años de experiencia en el campo.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Experiencia:</span> 15+ años
                  </p>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Certificaciones:</p>
                    <ul className="space-y-1">
                      <li className="text-muted-foreground">• Certificado de Mecánica Automotriz</li>
                      <li className="text-muted-foreground">• Certificado de Reparación de Motor</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-b from-secondary/10 to-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="relative h-64 w-full overflow-hidden">
                <Image src="/placeholder.svg" alt="Jane Smith" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground">Jane Smith</h3>
                <p className="text-primary font-semibold mb-2">Asistente de Servicio</p>
                <p className="text-sm text-muted-foreground mb-4">Atención al Cliente</p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Jane se especializa en brindar un excelente servicio al cliente.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Experiencia:</span> 10+ años
                  </p>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Certificaciones:</p>
                    <ul className="space-y-1">
                      <li className="text-muted-foreground">• Certificado de Atención al Cliente</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Add more team members here if needed */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Listo para confiar en nuestro equipo?</h2>
          <p className="text-xl text-white/90 mb-8">
            Contacta con nosotros para conocer más sobre nuestros servicios y equipo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-secondary transition-colors"
            >
              Contáctanos
            </Link>
            <Link
              href="/servicios"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
