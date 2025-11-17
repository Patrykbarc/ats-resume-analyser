import { getEnvs } from '../lib/getEnv'

type Config = {
  port: number
  nodeEnv: string
}

const config: Config = {
  port: +getEnvs().PORT || 8080,
  nodeEnv: getEnvs().NODE_ENV || 'development'
}

export default config
