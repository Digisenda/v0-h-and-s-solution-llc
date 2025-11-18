import { ContactForm } from "@/components/contact-form"
import { getContactInfo } from "@/lib/content-loader"

// Force dynamic rendering for CMS content
export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata = {
  title: "Contacto - H&S Solution LLC",
  description: "Ponte en contacto con H&S Solution LLC para solicitar nuestros servicios automotrices en San Antonio, TX",
  alternates: {
    canonical: "/contacto",
  },
}

export default async function ContactPage() {
  const contactInfo = await getContactInfo()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contáctanos</h1>
          <p className="text-lg text-white/90">
            Nos encantaría escuchar de ti. Envíanos un mensaje y nos comunicaremos a la brevedad.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Teléfono</h3>
                  <a href={`tel:${contactInfo.phone1}`} className="text-accent hover:text-accent/80 font-medium">
                    {contactInfo.phone1}
                  </a>
                  <br />
                  <a href={`tel:${contactInfo.phone2}`} className="text-accent hover:text-accent/80 font-medium">
                    {contactInfo.phone2}
                  </a>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Email</h3>
                  <a href={`mailto:${contactInfo.email}`} className="text-accent hover:text-accent/80 font-medium">
                    {contactInfo.email}
                  </a>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Dirección</h3>
                  <p className="text-muted-foreground">
                    {contactInfo.address}
                    <br />
                    Estados Unidos
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Horarios</h3>
                  <p className="text-muted-foreground">
                    Lunes - Viernes: 7:00 AM - 6:00 PM
                    <br />
                    Sábado: 8:00 AM - 4:00 PM
                    <br />
                    Domingo: Cerrado
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>

          {/* Map Section (Optional) */}
          <div className="bg-muted rounded-lg overflow-hidden h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3481.9099254999996!2d-98.49362!3d29.42656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b59f5ecb2005%3A0x2c5a25b0d7d1b0e0!2sSan%20Antonio%2C%20TX!5e0!3m2!1ses!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
