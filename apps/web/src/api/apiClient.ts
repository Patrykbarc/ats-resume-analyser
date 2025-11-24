import { getEnvs } from '@/lib/getEnv'
import { QueryClient } from '@tanstack/query-core'
import axios, { isAxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retryOnMount: false,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (isAxiosError(error) && error.status === StatusCodes.NOT_FOUND) {
          return false
        }
        return failureCount < 3
      }
    }
  }
})

export const apiClient = axios.create({
  baseURL: `${getEnvs().VITE_API_URL}/api`,
  timeout: 60_000
})
