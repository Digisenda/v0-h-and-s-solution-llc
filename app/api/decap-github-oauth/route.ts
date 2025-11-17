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
      { status: 500 },
    )
  }

  // 1) SIN "code" -> redirigir a GitHub
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

  // 2) CON "code" -> pedir access_token a GitHub
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
        { status: 400 },
      )
    }

    if (!tokenData.access_token) {
      return NextResponse.json(
        { error: "No access token received from GitHub" },
        { status: 400 },
      )
    }

    const accessToken = tokenData.access_token

    // HTML DEL POPUP: handshake + success siguiendo el patrón oficial
    const htmlResponse = `
      <!doctype html>
      <html>
        <body>
          <p>Autenticación correcta. Puedes cerrar esta ventana.</p>
          <script>
            (function() {
              function receiveMessage(e) {
                try {
                  // Cuando el CMS responde al "authorizing:github",
                  // reenviamos el token en el formato que espera Decap
                  window.opener.postMessage(
                    'authorization:github:success:' + JSON.stringify({
                      token: '${accessToken}',
                      provider: 'github'
                    }),
                    e.origin
                  );
                  window.removeEventListener("message", receiveMessage, false);
                  window.close();
                } catch (err) {
                  console.error("Error reenviando el token al opener:", err);
                }
              }

              window.addEventListener("message", receiveMessage, false);

              // Handshake: avisamos al CMS que estamos autorizando
              window.opener.postMessage("authorizing:github", "*");
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
