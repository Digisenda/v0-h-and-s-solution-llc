import GalleryGrid from "@/components/gallery-grid"
import { getGalleryItems } from "@/lib/content-loader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Galería de Trabajos - H&S Solution LLC",
  description: "Galería de trabajos de reparación y mantenimiento automotriz realizados por H&S Solution LLC",
  alternates: {
    canonical: "/galeria",
  },
}

export default async function GalleryPage() {
  const items = await getGalleryItems()

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Galería de Trabajos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Aprecia la calidad de nuestros trabajos en reparación y mantenimiento automotriz
          </p>
        </div>

        {items.length > 0 ? (
          <GalleryGrid items={items} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aún no hay trabajos en la galería. Vuelve pronto.</p>
          </div>
        )}
      </div>
    </main>
  )
}
