type NodeEnv = 'development' | 'production'

export const getEnv = () => {
  const API_URL = import.meta.env.VITE_API_URL
  const NODE_ENV: NodeEnv = import.meta.env.NODE_ENV

  if (!API_URL) {
    throw new Error('Missing API_KEY env variable')
  }

  if (!NODE_ENV) {
    throw new Error('Missing NODE_ENV env variable')
  }

  return { API_URL, NODE_ENV }
}
