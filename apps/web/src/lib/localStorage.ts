import { AxiosError, AxiosResponse, isAxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'

const isRateLimitError = (error: unknown): error is AxiosError => {
  return (
    isAxiosError(error) &&
    error.response?.status === StatusCodes.TOO_MANY_REQUESTS
  )
}

const getRateLimitRemaining = (response?: AxiosResponse): number | null => {
  const remaining = response?.headers?.['x-ratelimit-remaining']
  if (!remaining) {
    return null
  }

  const parsed = Number(remaining)
  return isNaN(parsed) ? null : parsed
}

const getRateLimitReset = (response?: AxiosResponse): string | null => {
  const resetTimestamp = response?.headers?.['x-ratelimit-reset']
  if (!resetTimestamp) {
    return null
  }

  const parsed = Number(resetTimestamp)
  if (isNaN(parsed)) {
    return null
  }

  const resetDate = new Date(parsed * 1000)
  return resetDate.toLocaleString('pl-PL')
}

export { getRateLimitRemaining, getRateLimitReset, isRateLimitError }
