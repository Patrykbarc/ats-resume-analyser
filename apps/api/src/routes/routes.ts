import { Application } from 'express'
import analyzeRoutes from './analyze.routes'
import authRoutes from './auth.routes'
import checkoutRoutes from './checkout.routes'
import cronRoutes from './cron.routes'
import healthRoute from './health.route'

export const routes = (app: Application) => {
  app.use('/health', healthRoute)
  app.use('/api/cv', analyzeRoutes)
  app.use('/api/auth', authRoutes)
  app.use('/api/checkout', checkoutRoutes)
  app.use('/api/cron', cronRoutes)
}
