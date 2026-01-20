import { type NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/security'

/**
 * API Route Security Middleware
 * Provides rate limiting, CORS validation, and request validation
 */

export interface ApiHandlerOptions {
  method?: string[]
  rateLimit?: {
    maxRequests: number
    windowMs: number
  }
  requireAuth?: boolean
}

/**
 * Wrap API route handlers with security middleware
 */
export function withSecurityMiddleware(
  handler: (req: NextRequest) => Promise<NextResponse>,
  options: ApiHandlerOptions = {}
) {
  return async (req: NextRequest) => {
    try {
      // Check HTTP method
      if (options.method && !options.method.includes(req.method)) {
        return NextResponse.json(
          { error: 'Method not allowed' },
          { status: 405 }
        )
      }

      // Rate limiting
      const ip = getClientIp(req)
      if (options.rateLimit) {
        const { maxRequests, windowMs } = options.rateLimit
        if (!checkRateLimit(ip, maxRequests, windowMs)) {
          return NextResponse.json(
            { error: 'Too many requests' },
            { status: 429 }
          )
        }
      }

      // CORS validation
      const origin = req.headers.get('origin')
      if (origin && !isValidOrigin(origin)) {
        return NextResponse.json(
          { error: 'Invalid origin' },
          { status: 403 }
        )
      }

      // Authentication check
      if (options.requireAuth) {
        const auth = req.headers.get('authorization')
        if (!auth || !auth.startsWith('Bearer ')) {
          return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
          )
        }
      }

      // Call the actual handler
      return await handler(req)
    } catch (error) {
      console.error('API Error:', error)
      
      // Don't expose error details in production
      const message = process.env.NODE_ENV === 'development' 
        ? error instanceof Error ? error.message : 'Unknown error'
        : 'Internal server error'

      return NextResponse.json(
        { error: message },
        { status: 500 }
      )
    }
  }
}

/**
 * Get client IP address from request
 */
function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || '127.0.0.1'
  return ip
}

/**
 * Validate request origin
 */
function isValidOrigin(origin: string): boolean {
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    'http://localhost:3000',
    'http://localhost:3001',
  ]

  return allowedOrigins.some((allowed) => {
    try {
      const allowedUrl = new URL(allowed)
      const originUrl = new URL(origin)
      return allowedUrl.host === originUrl.host
    } catch {
      return false
    }
  })
}

/**
 * Validate JSON content type
 */
export function validateContentType(req: NextRequest): boolean {
  const contentType = req.headers.get('content-type')
  return contentType?.includes('application/json') || false
}

/**
 * Safe JSON parse with size limit
 */
export async function safeJsonParse(req: NextRequest, maxSize: number = 1024 * 100) {
  const contentLength = req.headers.get('content-length')
  
  if (contentLength && parseInt(contentLength) > maxSize) {
    throw new Error('Payload too large')
  }

  try {
    return await req.json()
  } catch (error) {
    throw new Error('Invalid JSON')
  }
}
