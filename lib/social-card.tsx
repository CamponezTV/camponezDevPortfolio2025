import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import sharp from "sharp"
import type { Language } from "@/config/translations"
import { ORGANIZATIONS, PERSON, SEO_COPY, SITE_URL } from "./site"
import { SOCIAL_CARD_SIZE } from "./social-card-meta"

const PORTRAIT_FILE = "ensaio-2026-retrato.webp"
const PORTRAIT_WIDTH = 460
const COLORS = {
  background: "#1b1b21",
  foreground: "#f3f2f9",
  subtle: "#a9abbe",
  muted: "#8a8da3",
  accent: "#aab2d1",
  hairline: "rgba(243, 242, 249, 0.1)",
}

async function loadPortraitDataUri(): Promise<string> {
  const source = await readFile(join(process.cwd(), "public", PORTRAIT_FILE))
  const portrait = await sharp(source)
    .resize(PORTRAIT_WIDTH, SOCIAL_CARD_SIZE.height, { fit: "cover" })
    .jpeg({ quality: 82 })
    .toBuffer()
  return `data:image/jpeg;base64,${portrait.toString("base64")}`
}

export async function renderSocialCard(language: Language): Promise<ImageResponse> {
  const copy = SEO_COPY[language]
  const portrait = await loadPortraitDataUri()
  const domain = new URL(SITE_URL).hostname

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: COLORS.background }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "64px 72px",
            borderRight: `1px solid ${COLORS.hairline}`,
          }}
        >
          <div style={{ display: "flex", fontSize: 24, color: COLORS.muted }}>{domain}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 28, color: COLORS.subtle }}>{copy.tagline}</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 24,
                fontSize: 104,
                fontWeight: 600,
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
              }}
            >
              <span style={{ color: COLORS.foreground }}>{PERSON.givenName}</span>
              <span style={{ color: COLORS.accent }}>Camponez</span>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: COLORS.muted }}>
            {`${ORGANIZATIONS.ocl.name} · ${ORGANIZATIONS.novasyn.name} · ${copy.place}`}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={portrait} alt="" width={PORTRAIT_WIDTH} height={SOCIAL_CARD_SIZE.height} />
      </div>
    ),
    SOCIAL_CARD_SIZE,
  )
}
