const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const VERIFY_TIMEOUT_MS = 5_000

/** Without TURNSTILE_SECRET_KEY the check is skipped, so the form keeps working until the key is configured. */
export async function verifyTurnstileToken(token: unknown, clientIp: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
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
