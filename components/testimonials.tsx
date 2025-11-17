import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    author: "Juan García",
    rating: 5,
    quote: "Excelente servicio, muy profesionales. Mi auto quedó como nuevo.",
  },
  {
    id: 2,
    author: "María López",
    rating: 5,
    quote: "Precios justos y calidad garantizada. Recomiendo 100%.",
  },
  {
    id: 3,
    author: "Carlos Rodríguez",
    rating: 5,
    quote: "Llevé mi vehículo y fue reparado correctamente. Muy satisfecho.",
  },
]

import type { HomeContent } from "@/lib/content-loader"

interface TestimonialsProps {
  content: HomeContent
}

export default function Testimonials({ content }: TestimonialsProps) {
  const { testimonialsSection } = content

  return (
    <section id="testimonios" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-accent font-semibold text-sm uppercase tracking-wide">{testimonialsSection.badge}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-pretty">{testimonialsSection.title}</h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={20} className="fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground mb-6 text-lg leading-relaxed">"{testimonial.quote}"</p>

              {/* Author */}
              <p className="text-muted-foreground font-semibold">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
