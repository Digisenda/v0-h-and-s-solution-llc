import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "H&S Solutions LLC - Taller Automotriz Profesional"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: "bold",
              color: "#d4af37",
              marginBottom: 20,
              display: "flex",
            }}
          >
            H&S Solutions LLC
          </div>
          <div
            style={{
              fontSize: 48,
              color: "white",
              marginBottom: 40,
              display: "flex",
            }}
          >
            Taller Automotriz Profesional
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#d4af37",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span style={{ marginBottom: 10 }}>San Antonio, Texas</span>
            <span>Servicio de Calidad Garantizado</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
