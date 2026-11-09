/** @jest-environment node */
import { verifyTurnstileToken } from '@/lib/turnstile'

function restore(name: string, value: string | undefined) {
  if (value === undefined) delete process.env[name]
  else process.env[name] = value
}

describe('verifyTurnstileToken', () => {
  const originalSecret = process.env.TURNSTILE_SECRET_KEY
  const originalSiteKey = process.env.TURNSTILE_SITE_KEY
  const originalPublicSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const fetchMock = jest.fn()

  beforeEach(() => {
    fetchMock.mockReset()
    process.env.TURNSTILE_SITE_KEY = 'site-key'
    delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    global.fetch = fetchMock as unknown as typeof fetch
  })

  afterEach(() => {
    restore('TURNSTILE_SECRET_KEY', originalSecret)
    restore('TURNSTILE_SITE_KEY', originalSiteKey)
    restore('NEXT_PUBLIC_TURNSTILE_SITE_KEY', originalPublicSiteKey)
  })

  it('skips verification when no secret is configured', async () => {
    delete process.env.TURNSTILE_SECRET_KEY

    await expect(verifyTurnstileToken(undefined, '1.1.1.1')).resolves.toBe(true)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('skips verification when the secret is set but no site key is configured', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret'
    delete process.env.TURNSTILE_SITE_KEY
    jest.spyOn(console, 'warn').mockImplementation(() => {})

    await expect(verifyTurnstileToken(undefined, '1.1.1.1')).resolves.toBe(true)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects a missing or non-string token when a secret is configured', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret'

    await expect(verifyTurnstileToken(undefined, '1.1.1.1')).resolves.toBe(false)
    await expect(verifyTurnstileToken(123, '1.1.1.1')).resolves.toBe(false)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('accepts a token that Cloudflare confirms', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret'
    fetchMock.mockResolvedValue({ json: async () => ({ success: true }) })

    await expect(verifyTurnstileToken('token', '1.1.1.1')).resolves.toBe(true)
  })

  it('rejects a token that Cloudflare refuses', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret'
    fetchMock.mockResolvedValue({ json: async () => ({ success: false }) })

    await expect(verifyTurnstileToken('token', '1.1.1.1')).resolves.toBe(false)
  })

  it('fails closed when Cloudflare is unreachable', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret'
    fetchMock.mockRejectedValue(new Error('network down'))
    jest.spyOn(console, 'error').mockImplementation(() => {})

    await expect(verifyTurnstileToken('token', '1.1.1.1')).resolves.toBe(false)
  })
})
