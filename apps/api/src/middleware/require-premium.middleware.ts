import { UserSchemaType } from '@monorepo/schemas'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { isPremiumUser } from '../controllers/helper/analyze/isPremiumUser'

export const requirePremium = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as UserSchemaType | undefined

  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Unauthorized'
    })
  }

  if (!isPremiumUser(user)) {
    return res.status(StatusCodes.FORBIDDEN).json({
      message: 'Premium access required'
    })
  }

  next()
}
