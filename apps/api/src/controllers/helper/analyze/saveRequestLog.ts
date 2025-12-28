import { UserSchemaType } from '@monorepo/schemas'
import type { Request } from 'express'
import { logger, prisma } from '../../../server'

export const saveRequestLog = async ({
  user,
  resultId,
  req
}: {
  user: UserSchemaType
  resultId: string
  req: Request
}) => {
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        requestLogs: {
          create: {
            analyseId: resultId,
            isPremiumRequest: user.isPremium,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'] || null
          }
        }
      }
    })
  } catch (error) {
    logger.error(`Error saving request log: ${error}`)
  }
}
