import { getTestimonials } from "@/lib/content-loader"
import { Star } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Testimonios - H&S Solution LLC",
  description: "Opiniones y testimonios de nuestros clientes satisfechos en San Antonio, TX",
  alternates: {
    canonical: "/testimonios",
  },
}

export default async function TestimoniosPage() {
  const testimonials = await getTestimonials()

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Testimonios de Clientes</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-2xl font-bold text-accent">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-foreground">{testimonial.author}</p>
                      <div className="flex gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < testimonial.rating
                                ? "fill-accent text-accent"
                                : "text-muted-foreground"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{testimonial.quote}</p>
                  {testimonial.date && (
                    <p className="text-xs text-muted-foreground mt-4">
                      {new Date(testimonial.date).toLocaleDateString("es-MX")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Pronto compartiremos testimonios de nuestros clientes satisfechos.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para experimentar nuestro servicio?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Únete a nuestros clientes satisfechos y agenda tu cita hoy
          </p>
          <a
            href="/contacto"
            className="inline-block bg-accent text-accent-foreground font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity"
          >
            Agendar Cita
          </a>
        </div>
      </section>
    </main>
  )
}
