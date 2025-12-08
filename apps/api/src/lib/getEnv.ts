import dotenv from 'dotenv'
import { resolve } from 'path'
import { ENV_NAMES, EnvironmentVariables } from '../constants/env.generated'

dotenv.config({ path: resolve(process.cwd(), 'apps/api/.env') })
dotenv.config()

export const getEnvs = (): EnvironmentVariables => {
  const envEntries = ENV_NAMES.map((variable) => {
    const value = process.env[variable]

    if (value === undefined || value === '') {
      throw new Error(
        `CONFIG ERROR: Required environment variable “${variable}” is not set or is empty.`
      )
    }

    return [variable, value] as [typeof variable, string]
  })

  return Object.fromEntries(envEntries) as unknown as EnvironmentVariables
}
