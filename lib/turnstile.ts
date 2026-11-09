const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const VERIFY_TIMEOUT_MS = 5_000

function getSiteKey(): string | undefined {
  return process.env.TURNSTILE_SITE_KEY || process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || undefined
}

/**
 * The check only runs when both keys are configured. With a secret but no site key the widget
 * could never render, so enforcing it would reject every submission.
 */
export async function verifyTurnstileToken(token: unknown, clientIp: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  if (!getSiteKey()) {
    console.warn('TURNSTILE_SECRET_KEY is set but no site key is configured; skipping captcha verification')
    return true
  }
  if (typeof token !== 'string' || !token) return false

  try {
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token, remoteip: clientIp }),
      signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS),
    })
    const result = (await response.json()) as { success?: boolean }
    return result.success === true
  } catch (error) {
    console.error('Turnstile verification failed:', error instanceof Error ? error.message : error)
    return false
  }
}
