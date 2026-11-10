import type { ReactNode } from "react"
import { Archivo, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import type { Language } from "@/config/translations"
import { CONSENT_DEFAULT_SCRIPT } from "@/lib/consent"
import { HTML_LANG } from "@/lib/i18n"
import { GOOGLE_TAG_MANAGER_ID } from "@/lib/site"
import { ConsentedTagManager } from "./consented-tag-manager"
import { CookieConsent } from "./cookie-consent"
import { ThemeProvider } from "./theme-provider"
import "@/app/globals.css"

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const SHOW_REVEALS_WITHOUT_JS = "<style>[data-reveal],[data-reveal] [data-reveal-item]{opacity:1!important}</style>"
const IS_PRODUCTION = process.env.NODE_ENV === "production"

export const SITE_VIEWPORT = { themeColor: "#1b1b21" }

interface RootDocumentProps {
  language: Language
  children: ReactNode
}

export function RootDocument({ language, children }: RootDocumentProps) {
  return (
    <html lang={HTML_LANG[language]} className="dark" suppressHydrationWarning>
      <body className={`${archivo.variable} ${geistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }} />
        <noscript dangerouslySetInnerHTML={{ __html: SHOW_REVEALS_WITHOUT_JS }} />
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" language={language}>
          {children}
          <CookieConsent />
          {IS_PRODUCTION && <ConsentedTagManager gtmId={GOOGLE_TAG_MANAGER_ID} />}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
