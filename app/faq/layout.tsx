import type { Metadata } from "next"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Preguntas Frecuentes - H&S Solution LLC",
  description:
    "Respuestas a las preguntas más frecuentes sobre nuestros servicios automotrices, garantías, horarios y formas de pago en H&S Solution LLC.",
  keywords: ["preguntas frecuentes", "FAQ taller", "garantía reparación", "horarios servicio automotriz"],
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Preguntas Frecuentes - H&S Solution LLC",
    description: "Encuentra respuestas sobre nuestros servicios, garantías y más",
    type: "website",
  },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Qué tipo de servicios ofrece H&S Solution LLC?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Realizamos mantenimiento preventivo, diagnóstico computarizado, reparación de motor, frenos, suspensión, cambio de aceite y revisión general del vehículo.",
        },
      },
      {
        "@type": "Question",
        name: "¿Necesito agendar una cita o puedo llegar sin avisar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Puedes visitarnos directamente, pero te recomendamos agendar una cita para garantizar un mejor tiempo de atención y evitar esperas innecesarias.",
        },
      },
      {
        "@type": "Question",
        name: "¿Ofrecen garantía sobre los trabajos realizados?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. La mayoría de nuestros servicios cuentan con garantía sobre mano de obra y repuestos. La duración depende del tipo de trabajo realizado.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto demora normalmente una reparación?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Depende del tipo de servicio. Un cambio de aceite puede tardar menos de una hora, mientras que reparaciones mayores pueden requerir más tiempo. Siempre te informamos antes de iniciar el trabajo.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué formas de pago aceptan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Aceptamos efectivo, tarjetas de débito y crédito, y en algunos casos pagos electrónicos. Consulta en recepción para más detalles.",
        },
      },
    ],
  }

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  )
}
