import OpenAI from 'openai'
import type { EasyInputMessage } from 'openai/resources/responses/responses.mjs'
import jsonPrompt from '../../prompt/prompt.json'

const PROMPT_VAR = '{{CV_TEXT}}'

export const analyseFile = async (extractedText: string) => {
  const apiKey = process.env.OPENAI_API_KEY
  const client = new OpenAI({ apiKey })

  const response = await client.responses.create({
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

  return response.output_text
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
