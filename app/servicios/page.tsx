"use client"

import type React from "react"
import Link from "next/link"
import { getServices } from "@/lib/content-loader"
import type { Service } from "@/lib/content-loader"
import { Wrench, Zap, Wind, Cog, Shield, Hammer } from 'lucide-react'
import { useEffect, useState } from "react"

const iconMap: Record<string, React.ComponentType<{ size: number; className: string }>> = {
  Wrench,
  Zap,
  Wind,
  Cog,
  Shield,
  Hammer,
}

export const metadata = {
  title: "Servicios - H&S Solutions LLC",
  description: "Servicios completos de mantenimiento y reparación automotriz",
}

export default async function ServiciosPage() {
  const servicesData = await getServices()
  const services = Array.isArray(servicesData) ? servicesData : []

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
                          alt={service.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      )}
                      {!service.image && <IconComponent size={48} className="text-primary" />}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {service.name}
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
