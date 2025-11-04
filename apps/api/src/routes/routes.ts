import type { Application } from 'express'
import multer from 'multer'
import analyzeRoutes from './analyzeRoutes'

const upload = multer({ storage: multer.memoryStorage() })

const multipartParser = upload.single('file')

export const routes = (app: Application) => {
  app.use(multipartParser)
  app.use('/api/cv', analyzeRoutes)
}
