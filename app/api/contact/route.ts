import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Validar que las variables de entorno existan
const SMTP_HOST = process.env.SMTP_HOST
const SMTP_PORT = process.env.SMTP_PORT
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message, vehicle, serviceType, source = "web_form" } = body

    // Validar campos requeridos
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Faltan campos requeridos: name, email, subject, message" },
        { status: 400 }
      )
    }

    // Validar email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Email inválido" }, { status: 400 })
    }

    // Verificar configuración SMTP
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
      console.error("Faltan variables de entorno SMTP")
      return NextResponse.json(
        { success: false, error: "Configuración de email no disponible" },
        { status: 500 }
      )
    }

    // Configurar transporter de Nodemailer
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: parseInt(SMTP_PORT) === 465, // true para 465, false para otros puertos
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })

    // Construir el contenido del email
    const emailContent = `
      <h2>Nuevo mensaje de contacto - H&S Solutions</h2>
      <p><strong>Origen:</strong> ${source === "chatbot" ? "Chatbot" : "Formulario Web"}</p>
      
      <h3>Información del Cliente</h3>
      <ul>
        <li><strong>Nombre:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Teléfono:</strong> ${phone || "No proporcionado"}</li>
      </ul>

      <h3>Detalles de la Solicitud</h3>
      <ul>
        <li><strong>Asunto:</strong> ${subject}</li>
        ${vehicle ? `<li><strong>Vehículo:</strong> ${vehicle}</li>` : ""}
        ${serviceType ? `<li><strong>Tipo de Servicio:</strong> ${serviceType}</li>` : ""}
      </ul>

      <h3>Mensaje</h3>
      <p>${message.replace(/\n/g, "<br>")}</p>

      <hr>
      <p><small>Enviado el: ${new Date().toLocaleString("es-MX", { timeZone: "America/Chicago" })}</small></p>
    `

    // Configurar el email
    const mailOptions = {
      from: `"H&S Solutions Contacto" <${CONTACT_FROM_EMAIL}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `[Contacto Web] ${subject}`,
      html: emailContent,
      text: `
Nuevo mensaje de contacto - H&S Solutions
Origen: ${source === "chatbot" ? "Chatbot" : "Formulario Web"}

Información del Cliente:
- Nombre: ${name}
- Email: ${email}
- Teléfono: ${phone || "No proporcionado"}

Detalles de la Solicitud:
- Asunto: ${subject}
${vehicle ? `- Vehículo: ${vehicle}` : ""}
${serviceType ? `- Tipo de Servicio: ${serviceType}` : ""}

Mensaje:
${message}

Enviado el: ${new Date().toLocaleString("es-MX", { timeZone: "America/Chicago" })}
      `,
    }

    // Enviar el email
    await transporter.sendMail(mailOptions)

    // Responder con éxito
    return NextResponse.json(
      {
        success: true,
        message: "Formulario enviado correctamente. Nos contactaremos pronto.",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error al enviar email de contacto:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al procesar el formulario. Por favor intente nuevamente.",
      },
      { status: 500 }
    )
  }
}
