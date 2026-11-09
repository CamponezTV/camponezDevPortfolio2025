export const securityConfig = {
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
}
