import cors from 'cors'
import type { Application } from 'express'
import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import { corsOptions } from '../config/cors'
import { analyzeLimiter, requestLimiter } from '../config/limiter'
import { routes } from '../routes/routes'
import { errorHandler } from './errorHandler'

export const middleware = (app: Application) => {
  app.use(helmet())
  app.use(cors(corsOptions))
  app.use(logger('dev'))

  app.use('/api/cv/analyze', analyzeLimiter)
  app.use('/api/cv/analysis/:id', requestLimiter)

  app.use(express.json())

  routes(app)

  app.use(errorHandler)
}

export default middleware
