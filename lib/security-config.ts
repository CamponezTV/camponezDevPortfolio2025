export const securityConfig = {
  csp: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // 'unsafe-eval' is required by Framer Motion
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', 'https:'],
    'font-src': ["'self'", 'data:'],
    'connect-src': ["'self'", 'https://api.brevo.com'],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
  },

  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  },

  rateLimit: {
    api: {
      maxRequests: 100,
      windowMs: 15 * 60 * 1000,
    },
    contact: {
      maxRequests: 5,
      windowMs: 60 * 60 * 1000,
    },
    email: {
      maxRequests: 3,
      windowMs: 60 * 60 * 1000,
    },
  },

  cors: {
    allowedOrigins: [
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.NEXT_PUBLIC_SITE_URL,
    ],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400,
  },

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

  requestLimits: {
    bodySize: '1mb',
    querySize: '2mb',
  },

  features: {
    enableCSRF: true,
    enableRateLimit: true,
    enableInputSanitization: true,
    enableCORS: true,
    enableSecurityHeaders: true,
    enableHSTS: true,
  },
}
