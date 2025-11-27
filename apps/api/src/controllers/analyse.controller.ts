import type { AiAnalysis, AiAnalysisError } from '@monorepo/types'
import type { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { promises as fs } from 'node:fs'
import { openAiClient } from '../server'
import { analyzeFile } from './helper/analyze/analyzeFile'
import { parseFileAndSanitize } from './helper/analyze/parseFileAndSanitize'
import { parseOpenAiApiResponse } from './helper/analyze/parseOpenAiApiResponse'
import { handleError } from './helper/handleError'

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
      await analyzeFile(sanitizedTextResult)

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
    handleError(error, res)
  }
}

// It's typed manually due to a lack of types from OpenAi
// Type structure is coming from: https://platform.openai.com/docs/api-reference/responses/input-items
type ParsedFile = {
  object: string
  data: [
    {
      id: string
      type: string
      role: string
      content: [
        {
          type: string
          text: string
        }
      ]
    }
  ]
  first_id: string
  last_id: string
  has_more: boolean
}

export const getAnalysys = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const response = await openAiClient.responses.retrieve(id)

    const responseList = (await openAiClient.responses.inputItems.list(
      id
    )) as unknown as ParsedFile

    const parsed_file = responseList.data[0].content[0].text
    const parsedResponse = parseOpenAiApiResponse(response)

    return res
      .status(StatusCodes.OK)
      .json({ status: StatusCodes.OK, ...parsedResponse, parsed_file })
  } catch (error) {
    handleError(error, res)
  }
}
