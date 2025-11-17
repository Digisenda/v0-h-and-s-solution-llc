import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Preguntas Frecuentes - H&S Solutions LLC",
  description:
    "Respuestas a las preguntas más frecuentes sobre nuestros servicios automotrices, garantías, horarios y formas de pago en H&S Solutions LLC.",
  keywords: ["preguntas frecuentes", "FAQ taller", "garantía reparación", "horarios servicio automotriz"],
  openGraph: {
    title: "Preguntas Frecuentes - H&S Solutions LLC",
    description: "Encuentra respuestas sobre nuestros servicios, garantías y más",
    type: "website",
  },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
