import { AnalysisParamsSchema, FileSchema } from '@monorepo/schemas'
import { Router } from 'express'
import { createAnalyze, getAnalysys } from '../controllers/analyseController'
import { validateData, validateFile } from '../middleware/validateEntries'

const router: Router = Router()

router.post('/analyze', validateFile(FileSchema), createAnalyze)
router.get('/analysis/:id', validateData(AnalysisParamsSchema), getAnalysys)

export default router
