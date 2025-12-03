import { Application } from 'express'
import analyzeRoutes from './analyze.routes'
import authRoutes from './auth.routes'
import healthRoute from './health.route'

export const routes = (app: Application) => (
  app.use('/health', healthRoute),
  app.use('/api/cv', analyzeRoutes),
  app.use('/api/auth', authRoutes)
)
