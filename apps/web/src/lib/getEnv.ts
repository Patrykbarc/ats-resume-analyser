type NodeEnv = 'development' | 'production'

export const getEnv = () => {
  const API_URL: string = import.meta.env.VITE_API_URL
  const NODE_ENV: NodeEnv = import.meta.env.VITE_NODE_ENV
  const FRONTEND_URL: string = import.meta.env.VITE_FRONTEND_URL

  if (!API_URL) {
    throwError('API_URL')
  }

  if (!NODE_ENV) {
    throwError('NODE_ENV')
  }

  if (!FRONTEND_URL) {
    throwError('FRONTEND_URL')
  }

  return { API_URL, NODE_ENV, FRONTEND_URL }
}

const throwError = (env: string) => {
  throw new Error(`Missing ${env} env variable`)
}
