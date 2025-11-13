import rateLimit from 'express-rate-limit'

const QUARTER_HOUR = 15 * 60 * 1000
const DAY = 24 * 60 * 60 * 1000

const requestLimiter = rateLimit({
  windowMs: QUARTER_HOUR,
  max: 100,
  message: {
    error: 'Too many requests, please try again later.'
  }
})

const analyzeLimiter = rateLimit({
  windowMs: DAY,
  max: process.env.NODE_ENV === 'development' ? 100 : 5,
  message: {
    error: 'The limit of analyses has been reached.'
  }
})

export { analyzeLimiter, requestLimiter }
