import { getEnvs } from '../lib/getEnv'

const exposedHeaders = [
  'X-RateLimit-Limit',
  'X-RateLimit-Remaining',
  'X-RateLimit-Reset'
]

export const corsOptions = () => ({
  origin: getEnvs().FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
  exposedHeaders
})
