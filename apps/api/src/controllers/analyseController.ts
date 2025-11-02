import type { AiAnalysis, AiAnalysisError } from '@monorepo/types'
import type { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { promises as fs } from 'node:fs'
import { analyseFile } from './helper/analyseFile'
import { parseAndSanitize } from './helper/parseAndSanitize'

export const createAnalyze = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const file = req.file

  if (!file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: StatusCodes.BAD_REQUEST, error: 'No file sent.' })
  }

  try {
    let buffer: Buffer

    if (file.buffer) {
      buffer = file.buffer
    } else if (file.path) {
      buffer = await fs.readFile(file.path)

      await fs.unlink(file.path)
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        error: 'Unsupported file upload method.'
      })
    }

    const sanitizedTextResult = await parseAndSanitize(buffer)
    const analysedFile = await analyseFile(sanitizedTextResult)

    const parsedAnalysedFile: AiAnalysis | AiAnalysisError =
      JSON.parse(analysedFile)

    if ('error' in JSON.parse(analysedFile)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        ...(parsedAnalysedFile as AiAnalysisError)
      })
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      ...(parsedAnalysedFile as AiAnalysis)
    })
  } catch (error) {
    console.error('Error while processing the file:', error)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: 'The file could not be processed.'
    })
  }
}
