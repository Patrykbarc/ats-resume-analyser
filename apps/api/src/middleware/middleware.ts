import cors from 'cors'
import type { Application } from 'express'
import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import { corsOptions } from '../config/cors.config'
import { analyzeLimiter, requestLimiter } from '../config/limiter.config'
import { routes } from '../routes/routes'
import { middlewareErrorHandler } from './middlewareErrorHandler'

export const middleware = (app: Application) => {
  app.use(helmet())
  app.use(cors(corsOptions))
  app.use(logger('dev'))

  app.use(express.json())

  app.use('/api/cv/analyze', analyzeLimiter)
  app.use('/api/cv/analysis/:id', requestLimiter)

  routes(app)

  app.use(middlewareErrorHandler)
}

export default middleware
