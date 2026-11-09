import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { checkRateLimit } from '@/lib/security'

export interface RateLimitRule {
  maxRequests: number
  windowMs: number
}

const limiters = new Map<string, Ratelimit>()

function getUpstashLimiter(namespace: string, { maxRequests, windowMs }: RateLimitRule): Ratelimit | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null

  const cacheKey = `${namespace}:${maxRequests}:${windowMs}`
  let limiter = limiters.get(cacheKey)
  if (!limiter) {
    limiter = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(maxRequests, `${windowMs} ms`),
      prefix: `ratelimit:${namespace}`,
    })
    limiters.set(cacheKey, limiter)
  }
  return limiter
}

/**
 * Uses Upstash Redis when configured, so the limit is shared across serverless instances.
 * Falls back to the per-instance in-memory limiter when Upstash is not configured or unreachable.
 */
export async function isWithinRateLimit(namespace: string, identifier: string, rule: RateLimitRule): Promise<boolean> {
  const limiter = getUpstashLimiter(namespace, rule)
  if (limiter) {
    try {
      const { success } = await limiter.limit(identifier)
      return success
    } catch (error) {
      console.error('Upstash rate limit failed, using in-memory fallback:', error instanceof Error ? error.message : error)
    }
  }
  return checkRateLimit(`${namespace}:${identifier}`, rule.maxRequests, rule.windowMs)
}
