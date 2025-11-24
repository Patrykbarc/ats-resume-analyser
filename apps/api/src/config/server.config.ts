import { getEnvs } from '../lib/getEnv'

type Config = {
  port: number
  nodeEnv: string
}

const { NODE_ENV, PORT } = getEnvs()

const config: Config = {
  port: +PORT || 8080,
  nodeEnv: NODE_ENV || 'development'
}

export default config
