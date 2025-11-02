import { AiAnalysis, AiAnalysisError } from '@monorepo/types'
import OpenAI from 'openai'
import type { EasyInputMessage } from 'openai/resources/responses/responses.mjs'
import jsonPrompt from '../../prompt/prompt.json'

const PROMPT_VAR = '{{CV_TEXT}}'

export const analyseFile = async (
  extractedText: string
): Promise<AiAnalysis | AiAnalysisError> => {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return { error: 'OPENAI_API_KEY is not set in environment variables.' }
  }

  const client = new OpenAI({ apiKey })

  let response
  try {
    response = await client.responses.create({
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
  } catch (error: unknown) {
    return { error: `OpenAI API Error: ${error || 'Unknown error'}` }
  }

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
    console.error('JSON Parsing Error:', parseError)
    console.error('Raw Response:', response.output_text)

    return {
      error: `Failed to parse AI response as JSON. Raw data: ${response.output_text.substring(0, 200)}...`
    }
  }
}

const getPrompt = (role: EasyInputMessage['role']) => {
  switch (role) {
    case 'developer':
      return JSON.stringify(jsonPrompt.developer_prompt)
    case 'assistant':
      return JSON.stringify(jsonPrompt.assistant_prompt)
    default:
      throw new Error(`Role not supported: ${role}`)
  }
}

export type { AiAnalysis, AiAnalysisError }
