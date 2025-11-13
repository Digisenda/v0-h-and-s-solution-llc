"use client"

import { useEffect, useState } from "react"
import GalleryGrid from "@/components/gallery-grid"
import type { GalleryItem } from "@/lib/content-loader"

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGallery() {
      try {
        const response = await fetch("/api/gallery")
        const data = await response.json()
        setItems(data.items || [])
      } catch (error) {
        console.error("Failed to load gallery:", error)
        setItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Galería de Trabajos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Aprecia la calidad de nuestros trabajos en reparación y mantenimiento automotriz
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando galería...</p>
          </div>
        ) : (
          <>
            <GalleryGrid items={items} />

            {items.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aún no hay trabajos en la galería. Vuelve pronto.</p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
