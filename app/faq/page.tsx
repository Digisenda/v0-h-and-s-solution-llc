import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { getFAQs } from "@/lib/content-loader"
import type { Metadata } from "next"
import ReactMarkdown from "react-markdown"

export const metadata: Metadata = {
  title: "Preguntas Frecuentes - H&S Solution LLC",
  description: "Respuestas a las preguntas más comunes sobre nuestros servicios automotrices en San Antonio, TX",
  alternates: {
    canonical: "/faq",
  },
}

export default async function FAQPage() {
  const faqs = await getFAQs()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Preguntas Frecuentes
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 text-balance">
            Respuestas claras sobre nuestros servicios, horarios y garantías.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {faqs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No hay preguntas frecuentes disponibles en este momento.
            </p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.slug}
                value={faq.slug}
                className="bg-card border border-border rounded-lg px-6 py-2 shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="py-4 text-lg font-semibold text-foreground hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 leading-relaxed pt-2 pb-4">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown>{faq.answer}</ReactMarkdown>
                  </div>
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
            ¿Tienes otra pregunta?
          </h2>
          <p className="text-secondary-foreground/80 mb-6 text-balance">
            Contáctanos directamente y con gusto te ayudamos.
          </p>
          <a href="/contacto">
            <Button size="lg" variant="default" className="bg-primary hover:bg-primary/90">
              Enviar mensaje
            </Button>
          </a>
        </div>
      </section>
    </div>
  )
}
