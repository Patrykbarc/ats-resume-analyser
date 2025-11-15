import { Application } from 'express'
import analyzeRoutes from './analyzeRoutes'

export const routes = (app: Application) => {
  app.use('/api/cv', analyzeRoutes)
}
