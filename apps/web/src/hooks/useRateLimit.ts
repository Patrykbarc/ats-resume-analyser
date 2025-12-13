import { useSessionState } from '@/stores/session/useSessionState'
import { isAfter } from 'date-fns'
const LOCALSTORAGE = {
  REQUESTS_LEFT_KEY: 'requestsLeft',
  REQUESTS_COOLDOWN_KEY: 'requestsCooldown'
}

export const useRateLimit = () => {
  const { isPremium } = useSessionState()

  if (isPremium) {
    return { requestsLeft: Infinity, setRequestsLeft }
  }

  const requestsLeft = getRequestsLeft()
  const isOutOfFreeRequests = requestsLeft !== null && requestsLeft <= 0

  const now = new Date()
  const requestsCooldown = getRequestsCooldown()
  const requestCooldownEnd = requestsCooldown && isAfter(now, requestsCooldown)

  if (requestCooldownEnd) {
    resetRequestsCooldown()
  }

  return {
    requestsLeft,
    setRequestsLeft,
    requestsCooldown,
    setRequestsCooldown,
    isOutOfFreeRequests
  }
}

const setRequestsLeft = (remaining: number) => {
  if (typeof remaining !== 'number' || isNaN(remaining)) {
    return
  }

  localStorage.setItem(LOCALSTORAGE.REQUESTS_LEFT_KEY, String(remaining))
}

const setRequestsCooldown = (timestamp: string | null) => {
  if (!timestamp) {
    return
  }

  localStorage.setItem(LOCALSTORAGE.REQUESTS_COOLDOWN_KEY, timestamp)
}

const getRequestsLeft = () => {
  const value = localStorage.getItem(LOCALSTORAGE.REQUESTS_LEFT_KEY)
  if (!value) {
    return null
  }
  const parsed = parseInt(value, 10)
  return isNaN(parsed) ? null : parsed
}

const getRequestsCooldown = () => {
  const value = localStorage.getItem(LOCALSTORAGE.REQUESTS_COOLDOWN_KEY)

  return value ? value : null
}

const resetRequestsCooldown = () => {
  localStorage.removeItem(LOCALSTORAGE.REQUESTS_COOLDOWN_KEY)
}
