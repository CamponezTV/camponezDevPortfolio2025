/** @jest-environment node */
import { isWithinRateLimit } from '@/lib/rate-limit'

describe('isWithinRateLimit (in-memory fallback)', () => {
  beforeEach(() => {
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
  })

  it('blocks requests beyond the limit for the same identifier', async () => {
    const rule = { maxRequests: 2, windowMs: 60_000 }

    expect(await isWithinRateLimit('test-block', 'ip-a', rule)).toBe(true)
    expect(await isWithinRateLimit('test-block', 'ip-a', rule)).toBe(true)
    expect(await isWithinRateLimit('test-block', 'ip-a', rule)).toBe(false)
  })

  it('counts each identifier and namespace separately', async () => {
    const rule = { maxRequests: 1, windowMs: 60_000 }

    expect(await isWithinRateLimit('test-sep', 'ip-a', rule)).toBe(true)
    expect(await isWithinRateLimit('test-sep', 'ip-b', rule)).toBe(true)
    expect(await isWithinRateLimit('test-other', 'ip-a', rule)).toBe(true)
    expect(await isWithinRateLimit('test-sep', 'ip-a', rule)).toBe(false)
  })
})
