import { AiAnalysis, AiAnalysisError } from '@monorepo/types'
import type { EasyInputMessage } from 'openai/resources/responses/responses.mjs'
import premiumPrompt from '../../../prompt/permium_prompt.json'
import { openAiClient } from '../../../server'
import { parseOpenAiApiResponse } from './parseOpenAiApiResponse'

const PROMPT_VAR = '{{CV_TEXT}}'

export type AnalyseApiResponse = { id: string; output_text: string }

export const analyzeFile = async (
  extractedText: string
): Promise<AiAnalysis | AiAnalysisError> => {
  let response: AnalyseApiResponse

  try {
    response = await openAiClient.responses
      .create({
        model: 'gpt-4.1-nano',
        input: [
          { role: 'developer', content: getPrompt('developer') },
          {
            role: 'assistant',
            content: getPrompt('assistant').replace(PROMPT_VAR, extractedText)
          },
          { role: 'user', content: extractedText }
        ]
      })
      .then((res) => {
        return { id: res.id, output_text: res.output_text }
      })
  } catch (error) {
    return { error: `OpenAI API Error: ${error || 'Unknown error'}` }
  }

  return parseOpenAiApiResponse(response)
}

const getPrompt = (role: EasyInputMessage['role']) => {
  switch (role) {
    case 'developer':
      return JSON.stringify(premiumPrompt.developer_prompt)
    case 'assistant':
      return JSON.stringify(premiumPrompt.assistant_prompt)
    default:
      throw new Error(`Role not supported: ${role}`)
  }
}

export type { AiAnalysis, AiAnalysisError }
