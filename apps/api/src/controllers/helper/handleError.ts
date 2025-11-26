import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import OpenAI from 'openai'
import { logger } from '../../server'

export function handleError(error: unknown, res: Response) {
  logger.error(`An error occured: ${error}`)

  if (error instanceof OpenAI.APIError) {
    const { status, message } = error

    logger.error(message)

    const statusCode = status || StatusCodes.INTERNAL_SERVER_ERROR

    switch (status) {
      case StatusCodes.NOT_FOUND:
        return res.status(statusCode).json({
          status: statusCode,
          error: 'The requested resource was not found.'
        })
      case StatusCodes.BAD_REQUEST:
        return res.status(statusCode).json({
          status: statusCode,
          error: 'Bad Request.'
        })
      case StatusCodes.UNAUTHORIZED:
      case StatusCodes.FORBIDDEN:
        return res.status(statusCode).json({
          status: statusCode,
          error: 'Authentication issue or forbidden access.'
        })
      case StatusCodes.TOO_MANY_REQUESTS:
        return res.status(statusCode).json({
          status: statusCode,
          error: 'Rate Limit exceeded. Please try again later.'
        })
      default:
        return res.status(statusCode).json({
          status: statusCode,
          error: 'An unexpected error occurred in the OpenAI API.'
        })
    }
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    error:
      'Internal server error. Could not connect or application logic error.'
  })

  return false
}
