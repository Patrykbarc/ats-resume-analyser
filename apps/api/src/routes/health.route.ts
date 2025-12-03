import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

const router: Router = Router()

router.get('/', (_, res) => {
  res.status(StatusCodes.OK).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

export default router
