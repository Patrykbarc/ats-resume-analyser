import type { Response } from 'express'
import jwt from 'jsonwebtoken'
import { getEnvs } from '../../../lib/getEnv'
import { prisma } from '../../../server'

export const handleNewJwtTokens = async ({
  userId,
  res
}: {
  userId: string
  res: Response
}) => {
  const { JWT_SECRET, JWT_REFRESH_SECRET } = getEnvs()

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '1h'
  })

  const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, {
    expiresIn: '7d'
  })

  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken }
  })

  res.cookie('jwt_refresh', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

  return token
}
