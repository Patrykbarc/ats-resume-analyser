import { Router } from 'express'
import { requireCronKey } from '../middleware/require-cron-key'

const router: Router = Router()

router.get('/keep-alive', requireCronKey)

export default router