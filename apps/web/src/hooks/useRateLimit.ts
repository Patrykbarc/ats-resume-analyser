import { useSessionState } from '@/stores/session/useSessionState'

const REQUESTS_LEFT_KEY = 'requestsLeft'

export const useRateLimit = () => {
  const { isPremium } = useSessionState()

  if (isPremium) {
    return { requestsLeft: Infinity, setRequestsLeft }
  }

  const requestsLeft = getRequestsLeft()
  return { requestsLeft, setRequestsLeft }
}

const setRequestsLeft = (remaining: number) => {
  if (typeof remaining !== 'number' || isNaN(remaining)) {
    return
  }

  localStorage.setItem(REQUESTS_LEFT_KEY, String(remaining))
}

const getRequestsLeft = (): number | null => {
  const value = localStorage.getItem(REQUESTS_LEFT_KEY)
  if (!value) {
    return null
  }
  const parsed = parseInt(value, 10)
  return isNaN(parsed) ? null : parsed
}
