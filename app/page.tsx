import Header from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Testimonials from "@/components/testimonials"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "H&S Solutions LLC - Taller Automotriz Profesional en San Antonio, TX",
  description:
    "Servicios automotrices profesionales en San Antonio, Texas. Reparación, mantenimiento preventivo y diagnóstico computarizado con garantía de calidad. Llama hoy: (210) 555-0123",
  keywords: [
    "taller automotriz San Antonio",
    "reparación de autos San Antonio TX",
    "mantenimiento vehicular",
    "diagnóstico computarizado",
    "mecánica automotriz",
    "servicio de frenos",
    "cambio de aceite San Antonio",
  ],
  openGraph: {
    title: "H&S Solutions LLC - Taller Automotriz Profesional",
    description: "Servicios automotrices profesionales con garantía de calidad en San Antonio, TX",
    type: "website",
    locale: "es_MX",
    url: "https://h-and-s-solutions.vercel.app",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
