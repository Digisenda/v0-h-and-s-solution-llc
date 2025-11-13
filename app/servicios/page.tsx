"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getServices } from "@/lib/content-loader"
import type { Service } from "@/lib/content-loader"
import { Wrench, Zap, Wind, Cog, Shield, Hammer } from "lucide-react"

const iconMap: Record<string, React.ComponentType<{ size: number; className: string }>> = {
  Wrench,
  Zap,
  Wind,
  Cog,
  Shield,
  Hammer,
}

export default function ServiciosPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices()
        setServices(data)
      } catch (error) {
        console.error("[v0] Error loading services:", error)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando servicios...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Servicios</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Contamos con servicios completos de mantenimiento y reparación automotriz con personal certificado y
            tecnología avanzada
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {services.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const IconComponent = iconMap[service.icon] || Wrench
                return (
                  <Link
                    key={service.slug}
                    href={`/servicios/${service.slug}`}
                    className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
                      {service.image && (
                        <img
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      )}
                      {!service.image && <IconComponent size={48} className="text-primary" />}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{service.description}</p>
                      <div className="flex justify-between items-end">
                        {service.price && <span className="text-accent font-semibold">{service.price}</span>}
                        {service.duration && <span className="text-xs text-muted-foreground">{service.duration}</span>}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No hay servicios disponibles en este momento.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
