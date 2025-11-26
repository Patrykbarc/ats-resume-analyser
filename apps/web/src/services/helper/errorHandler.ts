import { AiAnalysisError } from '@monorepo/types'
import { AxiosError } from 'axios'

export const errorHandler = ({
  error,
  message
}: {
  error: unknown
  message?: string
}) => {
  const axiosError = error as AxiosError<AiAnalysisError>

  if (axiosError.response?.data?.error) {
    throw new Error(axiosError.response?.data?.error || message)
  }

  if (axiosError.code === 'ECONNREFUSED') {
    throw new Error('Unable to connect to the API server')
  }

  if (axiosError.code === 'ECONNABORTED') {
    throw new Error('Connection timeout exceeded')
  }

  throw new Error('An unexpected error has occurred')
}
