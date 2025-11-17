import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Galería de Trabajos - H&S Solutions LLC",
  description:
    "Mira la calidad de nuestros trabajos en reparación y mantenimiento automotriz. Fotos de antes y después de servicios realizados en San Antonio, TX.",
  keywords: ["galería trabajos", "reparaciones realizadas", "antes y después", "trabajos automotrices"],
  openGraph: {
    title: "Galería de Trabajos - H&S Solutions LLC",
    description: "Descubre la calidad de nuestro trabajo automotriz",
    type: "website",
  },
}

export default function GaleriaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
