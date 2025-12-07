import { AnalysisParamsSchema, FileSchema } from '@monorepo/schemas'
import { Router } from 'express'
import multer from 'multer'
import { createAnalyze, getAnalysys } from '../controllers/analyse.controller'
import { requireAuth } from '../middleware/auth.middleware'
import { requirePremium } from '../middleware/requirePremium.middleware'
import { validateData, validateFile } from '../middleware/validateEntries'

const upload = multer({ storage: multer.memoryStorage() })
const multipartParser = upload.single('file')

const router: Router = Router()

router.post(
  '/analyze',
  multipartParser,
  validateFile(FileSchema),
  createAnalyze
)
router.post(
  '/analyze/premium',
  requireAuth,
  requirePremium,
  multipartParser,
  validateFile(FileSchema),
  createAnalyze
)
router.get('/analysis/:id', validateData(AnalysisParamsSchema), getAnalysys)

export default router
