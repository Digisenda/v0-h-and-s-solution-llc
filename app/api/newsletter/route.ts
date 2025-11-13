import { writeFileSync, mkdirSync, existsSync } from "fs"
import { join } from "path"

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()

    if (!email || !email.includes("@")) {
      return Response.json({ message: "Email inválido" }, { status: 400 })
    }

    const newsletterDir = join(process.cwd(), "content/newsletter")
    if (!existsSync(newsletterDir)) {
      mkdirSync(newsletterDir, { recursive: true })
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const filename = `${timestamp}-${email.split("@")[0]}.yml`
    const filePath = join(newsletterDir, filename)

    const yamlContent = `email: "${email}"
name: "${name || ""}"
active: true
date: "${new Date().toISOString()}"`

    writeFileSync(filePath, yamlContent, "utf8")

    return Response.json(
      {
        message: "Suscripción completada exitosamente",
        email,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Newsletter error:", error)
    return Response.json({ message: "Error al procesar la suscripción" }, { status: 500 })
  }
}
