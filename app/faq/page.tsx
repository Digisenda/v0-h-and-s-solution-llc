"use client"

import { useState } from "react"
import { getFAQs } from "@/lib/content-loader"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const categories = ["General", "Servicios", "Precios", "Garantía", "Horarios"]
const faqs = getFAQs()

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("General")
  const [isLoading, setIsLoading] = useState(false)

  const filteredFAQs = faqs.filter((faq) => faq.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Preguntas Frecuentes</h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 text-balance">
            Encuentra respuestas a las preguntas más comunes sobre nuestros servicios
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={selectedCategory === category ? "bg-primary text-primary-foreground" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* FAQ Accordions */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando preguntas frecuentes...</p>
          </div>
        ) : filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay preguntas en esta categoría.</p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {filteredFAQs.map((faq) => (
              <AccordionItem
                key={faq.slug}
                value={faq.slug}
                className="bg-card border border-border rounded-lg px-6 py-2 shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="py-4 text-lg font-semibold text-foreground hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 leading-relaxed pt-2 pb-4">
                  <div className="prose prose-sm max-w-none dark:prose-invert">{faq.answer}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-12 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-secondary-foreground text-balance">
            ¿No encontraste lo que buscas?
          </h2>
          <p className="text-secondary-foreground/80 mb-6 text-balance">
            Contáctanos directamente para resolver tus dudas
          </p>
          <a href="/contacto">
            <Button size="lg" variant="default" className="bg-primary hover:bg-primary/90">
              Enviar Mensaje
            </Button>
          </a>
        </div>
      </section>
    </div>
  )
}
