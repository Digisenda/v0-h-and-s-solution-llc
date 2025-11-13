"use client"

import { useState } from "react"
import Image from "next/image"
import type { GalleryItem } from "@/lib/content-loader"

interface GalleryGridProps {
  items: GalleryItem[]
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [showBefore, setShowBefore] = useState(true)

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.slug}
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer rounded-lg overflow-hidden border border-border hover:border-accent transition-all duration-300"
          >
            <div className="relative h-64 bg-muted">
              <Image
                src={item.imageAfter || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 bg-card">
              <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.service}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">{selectedItem.title}</h2>
                <p className="text-muted-foreground mb-4">{selectedItem.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-accent">{selectedItem.service}</span>
                  <button
                    onClick={() => setShowBefore(!showBefore)}
                    className="text-sm px-3 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    {showBefore ? "Ver Después" : "Ver Antes"}
                  </button>
                </div>
              </div>

              <div className="relative w-full h-96 rounded-lg overflow-hidden mb-6 bg-muted">
                <Image
                  src={
                    showBefore
                      ? selectedItem.imageBefore || "/placeholder.svg"
                      : selectedItem.imageAfter || "/placeholder.svg"
                  }
                  alt={showBefore ? "Antes" : "Después"}
                  fill
                  className="object-cover"
                />
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="w-full py-2 bg-muted hover:bg-muted/80 text-foreground rounded transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
