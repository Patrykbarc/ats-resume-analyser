export const getEnv = () => {
  const API_URL = import.meta.env.VITE_API_URL

  if (!API_URL) {
    throw new Error('Missing API_KEY or API_URL env variable')
  }

  return { API_URL }
}
