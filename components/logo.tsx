"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "hp"
  className?: string
}

const sizeMap = {
  sm: { width: 32, height: 32 },
  md: { width: 48, height: 48 },
  lg: { width: 64, height: 64 },
  hp: { width: 128, height: 128 },
}

export function Logo({ size = "md", className = "" }: LogoProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const dimensions = sizeMap[size]
  // Usa o ícone apropriado baseado no tema
  const iconSrc = mounted && theme === "dark" ? "/logo.png" : "/logo.png"

  return (
    <div className={className}>
      <Image
        src={iconSrc}
        alt="Logo"
        width={dimensions.width}
        height={dimensions.height}
        priority
        className="rounded-lg"
      />
    </div>
  )
}
