import { UserSchemaType } from '@monorepo/schemas'
import type { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import passport from '../config/passport.config'

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: Error, user: UserSchemaType) => {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: 'Authentication error'
        })
      }

      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Unauthorized'
        })
      }

      req.user = user
      next()
    }
  )(req, res, next)
}
