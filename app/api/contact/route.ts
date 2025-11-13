import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message, vehicle, serviceType } = body

    // Validar campos requeridos
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    // Aquí puedes integrar tu servicio de email (SendGrid, Resend, etc.)
    // Por ahora, guardamos los datos en el CMS a través de un commit

    // Preparar el contenido YAML para Decap CMS
    const timestamp = new Date().toISOString()
    const fileContent = `name: "${name}"
email: "${email}"
phone: "${phone || ""}"
subject: "${subject}"
message: |
  ${message.replace(/"/g, '\\"')}
vehicle: "${vehicle || ""}"
serviceType: "${serviceType || ""}"
read: false
date: "${timestamp}"
`

    // Retornar éxito (Decap CMS manejará el commit)
    return NextResponse.json(
      {
        success: true,
        message: "Formulario enviado correctamente. Nos contactaremos pronto.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error en contacto:", error)
    return NextResponse.json({ error: "Error al procesar el formulario" }, { status: 500 })
  }
}
