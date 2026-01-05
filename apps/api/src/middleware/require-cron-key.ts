import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { getEnvs } from '../lib/getEnv'
import { logger } from '../server'

export const requireCronKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { CRON_SECRET_KEY } = getEnvs()
  const cronKey = req.headers['x-cron-key'] as string | undefined

  logger.info({ CRON_SECRET_KEY, cronKey })

  if (cronKey !== CRON_SECRET_KEY) {
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' })
  }

  if (cronKey === CRON_SECRET_KEY) {
    logger.info('Cron key validated successfully')
  }

  next()
}
