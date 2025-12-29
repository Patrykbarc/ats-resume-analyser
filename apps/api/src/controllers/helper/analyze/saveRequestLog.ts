import { UserSchemaType } from '@monorepo/schemas'
import type { Request } from 'express'
import { logger, prisma } from '../../../server'

export const saveRequestLog = async ({
  user,
  resultId,
  file,
  req
}: {
  user: UserSchemaType
  resultId: string
  file: Express.Multer.File
  req: Request
}) => {
  try {
    const fileName = (file.originalname = Buffer.from(
      file.originalname,
      'latin1'
    ).toString('utf8'))

    await prisma.user.update({
      where: { id: user.id },
      data: {
        requestLogs: {
          create: {
            analyseId: resultId,
            fileName,
            fileSize: file.size,
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
