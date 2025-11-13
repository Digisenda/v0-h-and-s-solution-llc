export function getLocale(params: { lang?: string } | undefined): "es" | "en" {
  return params?.lang === "en" ? "en" : "es"
}
