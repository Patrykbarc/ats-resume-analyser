import dotenv from 'dotenv'

dotenv.config()

type IEnvironmentVariables = {
  NODE_ENV: string
  PORT: string
  OPENAI_API_KEY: string
  FRONTEND_URL: string
  JWT_SECRET: string
}

const ENV_NAMES = [
  'NODE_ENV',
  'PORT',
  'OPENAI_API_KEY',
  'FRONTEND_URL',
  'JWT_SECRET'
] as const

export const getEnvs = (): IEnvironmentVariables => {
  const envEntries = ENV_NAMES.map((variable) => {
    const value = process.env[variable]
    
    if (value === undefined || value === '') {
      throw new Error(
        `CONFIG ERROR: Required environment variable “${variable}” is not set or is empty.`
      )
    }

    return [variable, value] as [typeof variable, string]
  })

  return Object.fromEntries(envEntries) as IEnvironmentVariables
}
