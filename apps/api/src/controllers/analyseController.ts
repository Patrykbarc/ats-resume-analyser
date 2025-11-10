import type { AiAnalysis, AiAnalysisError } from '@monorepo/types'
import type { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { promises as fs } from 'node:fs'
import { openAiClient } from '../server'
import { analyseFile } from './helper/analyseFile'
import { handleOpenAIError } from './helper/handleOpenAIError'
import { parseFileAndSanitize } from './helper/parseFileAndSanitize'
import { parseOpenAiApiResponse } from './helper/parseOpenAiApiResponse'

export const createAnalyze = async (req: Request, res: Response) => {
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

    const sanitizedTextResult = await parseFileAndSanitize(buffer)

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
      ...(analysisResult as AiAnalysis),
      parsed_file: sanitizedTextResult
    })
  } catch (error) {
    handleOpenAIError(error, res)
  }
}

export const getAnalysys = async (req: Request, res: Response) => {
  const { id } = req.params
  let response

  try {
    response = await openAiClient.responses.retrieve(id)

    const parsedResponse = parseOpenAiApiResponse(response)

    return res
      .status(StatusCodes.OK)
      .json({ status: StatusCodes.OK, ...parsedResponse })
  } catch (error) {
    handleOpenAIError(error, res)
  }
}
