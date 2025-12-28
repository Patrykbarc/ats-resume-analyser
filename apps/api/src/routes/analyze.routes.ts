import { AnalysisParamsSchema, FileSchema } from '@monorepo/schemas'
import { Router } from 'express'
import multer from 'multer'
import { analyzeLimiter } from '../config/limiter.config'
import { createAnalyze, getAnalysys } from '../controllers/analyse.controller'
import { requireAuth } from '../middleware/require-auth.middleware'
import { requirePremium } from '../middleware/require-premium.middleware'
import { validateData, validateFile } from '../middleware/validateEntries'

const upload = multer({ storage: multer.memoryStorage() })
const multipartParser = upload.single('file')

const router: Router = Router()

router.post(
  '/analyze',
  analyzeLimiter,
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
