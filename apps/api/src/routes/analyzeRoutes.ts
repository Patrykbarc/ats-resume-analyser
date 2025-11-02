import { FileSchema } from '@monorepo/schemas'
import { Router } from 'express'
import { createAnalyze } from '../controllers/analyseController'
import { validateFile } from '../middleware/validateFile'

const router: Router = Router()

router.post('/analyze', validateFile(FileSchema), createAnalyze)
router.get('/analysis/:id', () => {})

export default router
