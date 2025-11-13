import { getServices } from "@/lib/content-loader"

export async function GET() {
  try {
    const services = await getServices()
    return Response.json({ services })
  } catch (error) {
    console.error("Error loading services:", error)
    return Response.json({ services: [] }, { status: 500 })
  }
}
