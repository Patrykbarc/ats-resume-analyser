import { AiAnalysis } from '@monorepo/types'
import { logger } from '../../../server'
import { AnalyseApiResponse } from './analyzeFile'

export const parseOpenAiApiResponse = (response: AnalyseApiResponse) => {
  try {
    const analysisData = JSON.parse(response.output_text) as Omit<
      AiAnalysis,
      'id'
    >

    const finalAnalysis: AiAnalysis = {
      ...analysisData,
      id: response.id
    }

    return finalAnalysis
  } catch (parseError: unknown) {
    logger.error(`JSON Parsing Error: ${parseError}`)
    logger.error(`Raw Response: ${response.output_text}`)

    return {
      error: `Failed to parse AI response as JSON. Raw data: ${response.output_text.substring(0, 200)}...`
    }
  }
}
