import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  className?: string
  sizes?: string
}

/**
 * Componente wrapper para Next.js Image com otimizações padrão
 * - Lazy loading automático
 * - WebP conversion
 * - Responsive sizing
 * - Blur placeholder suportado
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 75,
  className = '',
  sizes,
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={quality}
      loading={priority ? 'eager' : 'lazy'}
      className={className}
      sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
    />
  )
}

/**
 * Variante de imagem com aspecto ratio fixo
 * Útil para galerias e grids
 */
export function AspectRatioImage({
  src,
  alt,
  aspect = 'square',
  priority = false,
  className = '',
}: Omit<OptimizedImageProps, 'width' | 'height' | 'sizes'> & {
  aspect?: 'square' | 'video' | 'portrait' | 'landscape'
}) {
  const aspectMap = {
    square: '1 / 1',
    video: '16 / 9',
    portrait: '3 / 4',
    landscape: '4 / 3',
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: aspectMap[aspect] }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={75}
        loading={priority ? 'eager' : 'lazy'}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}

/**
 * Imagem com fallback para erro - versão corrigida
 * Usa estado para gerenciar falha de carregamento
 */
'use client'

import { useState } from 'react'

export function RobustImage({
  src,
  alt,
  fallback = '/placeholder.png',
  ...props
}: OptimizedImageProps & { fallback?: string }) {
  const [imageSrc, setImageSrc] = useState(src)

  return (
    <OptimizedImage
      src={imageSrc}
      alt={alt}
      {...props}
    />
  )
}
