// GitHub OAuth endpoint for Decap CMS
// Paso 1: si no hay "code", redirige a GitHub /authorize
// Paso 2: si hay "code", intercambia por access_token y se lo devuelve a Decap
// usando el formato de postMessage que Decap espera.

import { type NextRequest, NextResponse } from "next/server"

const CLIENT_ID = process.env.DECAP_GITHUB_CLIENT_ID
const CLIENT_SECRET = process.env.DECAP_GITHUB_CLIENT_SECRET

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const searchParams = url.searchParams

  const code = searchParams.get("code")
  const state = searchParams.get("state") ?? searchParams.get("site_id") ?? ""

  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error("Missing Decap GitHub OAuth env vars")
    return NextResponse.json(
      { error: "Server misconfiguration: missing OAuth credentials" },
      { status: 500 }
    )
  }

  // 1) PRIMER PASO: no hay "code" -> redirijo a GitHub /authorize
  if (!code) {
    const origin = url.origin
    const redirectUri = `${origin}/api/decap-github-oauth`

    const authorizeUrl = new URL("https://github.com/login/oauth/authorize")
    authorizeUrl.searchParams.set("client_id", CLIENT_ID)
    authorizeUrl.searchParams.set("redirect_uri", redirectUri)
    authorizeUrl.searchParams.set("scope", "repo")
    if (state) {
      authorizeUrl.searchParams.set("state", state)
    }

    return NextResponse.redirect(authorizeUrl.toString())
  }

  // 2) SEGUNDO PASO: ya viene "code" desde GitHub -> intercambio por token
  try {
    const origin = url.origin
    const redirectUri = `${origin}/api/decap-github-oauth`

    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: redirectUri,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      console.error("GitHub OAuth error:", tokenData)
      return NextResponse.json(
        { error: tokenData.error_description || tokenData.error || "OAuth failed" },
        { status: 400 }
      )
    }

    if (!tokenData.access_token) {
      return NextResponse.json(
        { error: "No access token received from GitHub" },
        { status: 400 }
      )
    }

    const accessToken = tokenData.access_token

    // HTML que habla con Decap usando el protocolo correcto
    const htmlResponse = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>GitHub Auth Success</title>
        </head>
        <body>
          <p>Autenticación correcta, puedes cerrar esta ventana.</p>
          <script>
            (function() {
              // Paso 1: handshake
              window.opener && window.opener.postMessage("authorizing:github", "*");

              // Paso 2: enviar token en el formato STRING que Decap espera
              setTimeout(function() {
                window.opener && window.opener.postMessage(
                  'authorization:github:success:' + JSON.stringify({
                    token: "${accessToken}",
                    provider: "github"
                  }),
                  "*"
                );
                window.close();
              }, 100);
            })();
          </script>
        </body>
      </html>
    `;

    return new NextResponse(htmlResponse, {
      headers: { "Content-Type": "text/html" },
    })
  } catch (error) {
    console.error("OAuth error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
