import { ENV_NAMES, EnvironmentVariables } from '@/constants/env.generated'

export const getEnvs = (): EnvironmentVariables => {
  const envEntries = ENV_NAMES.map((variable) => {
    const value = import.meta.env[variable]

    if (value === undefined || value === '') {
      throw new Error(
        `CONFIG ERROR: Required environment variable “${variable}” is not set or is empty.`
      )
    }

    return [variable, value] as [typeof variable, string]
  })

  return Object.fromEntries(envEntries) as EnvironmentVariables
}
