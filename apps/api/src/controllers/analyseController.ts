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

    const analysisResult: AiAnalysis | AiAnalysisError =
      await analyseFile(sanitizedTextResult)

    if ('error' in analysisResult) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        ...analysisResult
      })
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      ...(analysisResult as AiAnalysis)
    })
  } catch (error) {
    console.error('Error while processing the file:', error)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: 'The file could not be processed due to an internal server error.'
    })
  }
}

export const getAnalysys = async (req: Request, res: Response) => {
  // TODO: Implement logic of getting analysis by id
  res.status(StatusCodes.OK).json({ success: 'ok' })
}
