import { getEnv } from '@/lib/getEnv'
import { QueryClient } from '@tanstack/query-core'
import axios, { AxiosError } from 'axios'

const env = getEnv()

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retryOnMount: false,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (error instanceof AxiosError && error.message.includes('404')) {
          return false
        }
        return failureCount < 3
      }
    }
  }
})

export const apiClient = axios.create({
  baseURL: `${env.API_URL}/api`,
  timeout: 60_000
})
