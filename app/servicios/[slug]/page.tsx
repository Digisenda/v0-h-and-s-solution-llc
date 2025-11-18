import { getService, getServices } from "@/lib/content-loader"
import { notFound } from 'next/navigation'
import Link from "next/link"
import type { Service } from "@/lib/content-loader"
import { ChevronLeft, Check } from 'lucide-react'

// Force dynamic rendering for CMS content
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function generateStaticParams() {
  const services = await getServices("es")
  
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    return {
      title: "Servicio no encontrado",
    }
  }

  return {
    title: `${service.name} - H&S Solution LLC`,
    description: `${service.fullDescription || service.description} Servicio profesional en San Antonio, TX. Precio: ${service.price}. Duración: ${service.duration}.`,
    keywords: [
      service.name,
      "servicio automotriz San Antonio",
      "reparación",
      "mantenimiento",
      slug,
    ],
    alternates: {
      canonical: `/servicios/${slug}`,
    },
    openGraph: {
      title: `${service.name} - H&S Solution LLC`,
      description: service.description,
      type: "website",
    },
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/servicios"
            className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 w-fit"
          >
            <ChevronLeft size={20} />
            <span>Volver a servicios</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              {service.image && (
                <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <h1 className="text-4xl font-bold text-foreground mb-4">{service.name}</h1>

              <div className="prose prose-invert max-w-none mb-8">
                {service.fullDescription && (
                  <div className="text-muted-foreground whitespace-pre-wrap">{service.fullDescription}</div>
                )}
              </div>

              {/* Benefits */}
              {service.benefits && Array.isArray(service.benefits) && service.benefits.length > 0 && (
                <div className="bg-card border border-border rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Beneficios</h2>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check size={24} className="text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-accent text-accent-foreground rounded-lg p-8 sticky top-24">
                {service.price && (
                  <div className="mb-6">
                    <p className="text-sm text-accent-foreground/80 mb-2">Precio Aproximado</p>
                    <p className="text-3xl font-bold">{service.price}</p>
                  </div>
                )}

                {service.duration && (
                  <div className="mb-6 pb-6 border-b border-accent-foreground/20">
                    <p className="text-sm text-accent-foreground/80 mb-2">Duración Estimada</p>
                    <p className="font-semibold">{service.duration}</p>
                  </div>
                )}

                <Link
                  href="tel:+12108126833"
                  className="block w-full bg-background text-foreground font-bold py-3 px-4 rounded-lg text-center hover:opacity-90 transition-opacity mb-3"
                >
                  Solicitar Servicio
                </Link>

                <Link
                  href="mailto:plus@hssolutionllc.com"
                  className="block w-full border-2 border-accent-foreground text-accent-foreground font-bold py-3 px-4 rounded-lg text-center hover:bg-accent-foreground/10 transition-colors"
                >
                  Enviar Consulta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas este servicio?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Contacta con nosotros hoy y recibe una atención personalizada
          </p>
          <Link
            href="tel:+12108126833"
            className="inline-block bg-accent text-accent-foreground font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity"
          >
            Llamar Ahora
          </Link>
        </div>
      </section>
    </main>
  )
}
