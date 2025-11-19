type IEnvironmentVariables = {
  VITE_NODE_ENV: string
  VITE_API_URL: string
  VITE_FRONTEND_URL: string
}

const ENV_NAMES = [
  'VITE_NODE_ENV',
  'VITE_API_URL',
  'VITE_FRONTEND_URL'
] as const

export const getEnvs = (): IEnvironmentVariables => {
  const envEntries = ENV_NAMES.map((variable) => {
    const value = import.meta.env[variable]

    if (value === undefined || value === '') {
      throw new Error(
        `CONFIG ERROR: Required environment variable “${variable}” is not set or is empty.`
      )
    }

    return [variable, value] as [typeof variable, string]
  })

  return Object.fromEntries(envEntries) as IEnvironmentVariables
}
