import { NextResponse } from "next/server"
import { getGalleryItems } from "@/lib/content-loader"

// Force dynamic rendering for CMS content
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    const items = await getGalleryItems()
    
    return NextResponse.json({
      items,
      success: true,
    })
  } catch (error) {
    console.error("Error loading gallery items:", error)
    return NextResponse.json(
      {
        items: [],
        success: false,
        error: "Failed to load gallery items",
      },
      { status: 500 }
    )
  }
}
