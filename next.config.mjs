const isDev = process.env.NODE_ENV === 'development'
const TURNSTILE_ORIGIN = 'https://challenges.cloudflare.com'
const GOOGLE_TAG_ORIGINS = 'https://www.googletagmanager.com https://*.googletagmanager.com'
const GOOGLE_ANALYTICS_ORIGINS = 'https://*.google-analytics.com https://*.analytics.google.com'
const TAG_ASSISTANT_ORIGIN = 'https://tagmanager.google.com'

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${TURNSTILE_ORIGIN} ${GOOGLE_TAG_ORIGINS} ${TAG_ASSISTANT_ORIGIN}${isDev ? " 'unsafe-eval'" : ''}`,
  `style-src 'self' 'unsafe-inline' ${TAG_ASSISTANT_ORIGIN} https://fonts.googleapis.com`,
  "img-src 'self' data: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  `connect-src 'self' https://api.brevo.com ${TURNSTILE_ORIGIN} ${GOOGLE_TAG_ORIGINS} ${GOOGLE_ANALYTICS_ORIGINS}`,
  `frame-src ${TURNSTILE_ORIGIN} ${GOOGLE_TAG_ORIGINS}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=(), payment=()' },
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  experimental: {
    globalNotFound: true,
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.TURNSTILE_SITE_KEY || process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
  },
}

export default nextConfig
