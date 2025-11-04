import { AiAnalysisError } from '@monorepo/types'
import { AxiosError } from 'axios'
import { AnalyseResult } from '../analyseService'

export const errorHandler = (error: unknown): AnalyseResult => {
  const axiosError = error as AxiosError<AiAnalysisError>

  if (axiosError.response?.data?.error) {
    return {
      success: false,
      error: axiosError.response.data.error
    }
  }

  if (axiosError.code === 'ECONNREFUSED') {
    return {
      success: false,
      error: 'Unable to connect to the API server'
    }
  }

  if (axiosError.code === 'ECONNABORTED') {
    return {
      success: false,
      error: 'Connection timeout exceeded'
    }
  }

  return {
    success: false,
    error: axiosError.message || 'An unexpected error has occurred'
  }
}
