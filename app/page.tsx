import Header from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Testimonials from "@/components/testimonials"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import { getHomeContent, getSiteContent } from "@/lib/content-loader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "H&S Solution LLC - Taller Automotriz Profesional en San Antonio, TX",
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "H&S Solution LLC - Taller Automotriz Profesional",
    description: "Servicios automotrices profesionales con garantía de calidad en San Antonio, TX",
    type: "website",
    locale: "es_MX",
    url: "https://www.hssolutionllc.com",
  },
}

export default async function Home() {
  // Load content from CMS (default to Spanish)
  const homeContent = await getHomeContent("es")
  const siteContent = await getSiteContent("es")

  return (
    <main className="min-h-screen bg-background">
      <Header content={siteContent} />
      <Hero content={homeContent} />
      <Services content={homeContent} />
      <Testimonials content={homeContent} />
      <CTA content={homeContent} />
      <Footer content={siteContent} />
    </main>
  )
}
