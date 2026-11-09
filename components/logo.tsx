"use client"

import Image from "next/image"

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
  const { width, height } = sizeMap[size]

  return (
    <div className={className}>
      <Image src="/logo.png" alt="Logo" width={width} height={height} className="rounded-lg" />
    </div>
  )
}
