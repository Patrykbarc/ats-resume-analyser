import OpenAI from 'openai'
import app from './app'
import config from './config/config'

const openAiApiKey = process.env.OPENAI_API_KEY

if (!openAiApiKey) {
  throw new Error('OPENAI_API_KEY is not set in environment variables.')
}

export const openAiClient = new OpenAI({ apiKey: openAiApiKey })

app.get('/health', (_, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${config.port}`)
})
