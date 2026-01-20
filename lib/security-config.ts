/**
 * Security Configuration
 * Centralized security settings for the application
 */

export const securityConfig = {
  // Content Security Policy
  csp: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Unsafe needed for Framer Motion
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', 'https:'],
    'font-src': ["'self'", 'data:'],
    'connect-src': ["'self'", 'https://api.brevo.com'],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
  },

  // Security Headers
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  },

  // Rate Limiting
  rateLimit: {
    // API routes
    api: {
      maxRequests: 100,
      windowMs: 15 * 60 * 1000, // 15 minutes
    },
    // Contact form
    contact: {
      maxRequests: 5,
      windowMs: 60 * 60 * 1000, // 1 hour
    },
    // Email sending
    email: {
      maxRequests: 3,
      windowMs: 60 * 60 * 1000, // 1 hour
    },
  },

  // CORS Configuration
  cors: {
    allowedOrigins: [
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.NEXT_PUBLIC_SITE_URL,
    ],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400, // 24 hours
  },

  // Form Validation
  validation: {
    email: {
      minLength: 5,
      maxLength: 254,
    },
    message: {
      minLength: 10,
      maxLength: 5000,
    },
    name: {
      minLength: 2,
      maxLength: 100,
    },
  },

  // Request Limits
  requestLimits: {
    bodySize: '1mb',
    querySize: '2mb',
  },

  // Security Features
  features: {
    enableCSRF: true,
    enableRateLimit: true,
    enableInputSanitization: true,
    enableCORS: true,
    enableSecurityHeaders: true,
    enableHSTS: true,
  },
}

// Construct CSP header value
export function constructCSPHeader(): string {
  return Object.entries(securityConfig.csp)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ')
}

// Validate configuration
export function validateSecurityConfig(): void {
  const requiredHeaders = ['X-Content-Type-Options', 'X-Frame-Options', 'Referrer-Policy']

  for (const header of requiredHeaders) {
    if (!securityConfig.headers[header as keyof typeof securityConfig.headers]) {
      console.warn(`Missing security header: ${header}`)
    }
  }

  if (securityConfig.features.enableRateLimit && !securityConfig.rateLimit) {
    throw new Error('Rate limiting enabled but configuration missing')
  }
}
