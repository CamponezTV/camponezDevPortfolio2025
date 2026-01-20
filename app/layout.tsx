import type React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { AnimationProvider } from "@/components/animation-context"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Camponez DEV",
  description: "Site oficial de Arthur Camponez Marinho - Desenvolvedor, Criador & Inovador",
  generator: "v0.app",
  icons: {
    icon: "/logo.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0f1419",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark overflow-x-hidden" suppressHydrationWarning>
      <body 
        className={`${spaceGrotesk.variable} ${playfair.variable} font-sans antialiased scroll-smooth overflow-x-hidden`}
        style={{
          scrollBehavior: 'smooth',
        } as React.CSSProperties}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AnimationProvider>
            {children}
          </AnimationProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
