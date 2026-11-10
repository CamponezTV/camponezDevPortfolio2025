import type { MetadataRoute } from "next"
import { DEFAULT_LANGUAGE } from "@/lib/i18n"
import { PERSON, SEO_COPY } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  const copy = SEO_COPY[DEFAULT_LANGUAGE]
  return {
    name: copy.title,
    short_name: PERSON.shortName,
    description: copy.description,
    start_url: "/",
    display: "browser",
    background_color: "#1b1b21",
    theme_color: "#1b1b21",
    icons: [{ src: "/icon.png", sizes: "192x192", type: "image/png" }],
  }
}
