import { Wrench, Zap, RotateCw, Droplet, Gauge, Shield } from "lucide-react"

const services = [
  {
    id: 1,
    title: "Mantenimiento Preventivo",
    description: "Mantén tu vehículo en óptimas condiciones con nuestro servicio integral",
    icon: Wrench,
  },
  {
    id: 2,
    title: "Reparación de Motor",
    description: "Diagnóstico y reparación profesional de motores con garantía",
    icon: Zap,
  },
  {
    id: 3,
    title: "Alineación y Balanceo",
    description: "Servicios de alineación de ruedas y balanceo de neumáticos",
    icon: RotateCw,
  },
  {
    id: 4,
    title: "Cambio de Aceite",
    description: "Cambio profesional de aceite con filtros de calidad premium",
    icon: Droplet,
  },
  {
    id: 5,
    title: "Diagnóstico Completo",
    description: "Escaneo computarizado para detectar problemas temprano",
    icon: Gauge,
  },
  {
    id: 6,
    title: "Garantía 100%",
    description: "Todos nuestros servicios incluyen garantía de satisfacción",
    icon: Shield,
  },
]

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-accent font-semibold text-sm uppercase tracking-wide">Servicios</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-pretty">
            Servicios Automotrices Completos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Desde mantenimiento preventivo hasta reparaciones complejas
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <div
                key={service.id}
                className="bg-background border border-border rounded-2xl p-8 hover:shadow-lg hover:border-accent transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <IconComponent className="text-accent" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
