import { Application } from 'express'
import analyzeRoutes from './analyzeRoutes'
import authRoutes from './authRoutes'

export const routes = (app: Application) => (
  app.use('/api/cv', analyzeRoutes),
  app.use('/auth', authRoutes)
)
