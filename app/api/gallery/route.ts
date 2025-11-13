import { getGalleryItems } from "@/lib/content-loader"

export async function GET() {
  try {
    const items = await getGalleryItems()
    return Response.json({ items })
  } catch (error) {
    console.error("Error loading gallery items:", error)
    return Response.json({ items: [] }, { status: 500 })
  }
}
