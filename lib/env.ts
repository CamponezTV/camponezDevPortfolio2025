/**
 * Environment variable validation
 * Ensures all required env vars are present and have correct format
 */

interface EnvironmentConfig {
  NEXT_PUBLIC_SITE_URL: string
  NEXT_PUBLIC_BREVO_API_KEY?: string
  NODE_ENV: 'development' | 'production' | 'test'
}

function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key]

  if (!value) {
    if (defaultValue !== undefined) {
      return defaultValue
    }
    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value
}

export function validateEnv(): EnvironmentConfig {
  // Validate NEXT_PUBLIC_SITE_URL
  const siteUrl = getEnv('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000')
  try {
    new URL(siteUrl)
  } catch {
    throw new Error(`Invalid NEXT_PUBLIC_SITE_URL: ${siteUrl}`)
  }

  // Validate Brevo API Key format (should be alphanumeric)
  const brevoKey = process.env.NEXT_PUBLIC_BREVO_API_KEY
  if (brevoKey && !/^[a-zA-Z0-9]+$/.test(brevoKey)) {
    throw new Error('Invalid NEXT_PUBLIC_BREVO_API_KEY format')
  }

  const nodeEnv = (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development'

  if (!['development', 'production', 'test'].includes(nodeEnv)) {
    throw new Error(`Invalid NODE_ENV: ${nodeEnv}`)
  }

  return {
    NEXT_PUBLIC_SITE_URL: siteUrl,
    NEXT_PUBLIC_BREVO_API_KEY: brevoKey,
    NODE_ENV: nodeEnv,
  }
}

// Validate on module load
try {
  validateEnv()
} catch (error) {
  console.error('Environment validation failed:', error instanceof Error ? error.message : error)
  process.exit(1)
}
