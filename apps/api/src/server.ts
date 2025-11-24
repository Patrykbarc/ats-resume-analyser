import * as database from '@monorepo/database'
import OpenAI from 'openai'
import app from './app'
import config from './config/server.config'
import { getEnvs } from './lib/getEnv'

const { OPENAI_API_KEY } = getEnvs()

export const openAiClient = new OpenAI({ apiKey: OPENAI_API_KEY })
export const prisma = new database.PrismaClient()

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
