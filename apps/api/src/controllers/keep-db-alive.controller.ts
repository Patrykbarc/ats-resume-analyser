import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../server'
import { handleError } from './helper/handleError'

export const keepDbAlive = async (_: Request, res: Response) => {
  try {
    await prisma.cronLog.create({ data: {} })

    res.status(StatusCodes.OK).json({ message: 'Ok' })
  } catch (error) {
    handleError(error, res)
  }
}
