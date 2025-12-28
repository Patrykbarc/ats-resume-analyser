import { fromUnixTime, isAfter, isValid } from 'date-fns'
import { useCallback, useMemo } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export const useRateLimit = () => {
  const [requestsLeft, setRequestsLeft] = useLocalStorage<number | null>(
    'requestsLeft',
    null
  )
  const [requestsCooldown, setRequestsCooldownRaw] = useLocalStorage<
    string | null
  >('requestsCooldown', null)

  const cooldownDate = useMemo(() => {
    if (!requestsCooldown) {
      return null
    }

    const timestamp = Number(requestsCooldown)
    const date = isNaN(timestamp)
      ? new Date(requestsCooldown)
      : fromUnixTime(timestamp)
    return isValid(date) ? date : null
  }, [requestsCooldown])

  const isCooldownActive = useMemo(() => {
    if (!cooldownDate) {
      return false
    }
    return isAfter(cooldownDate, new Date())
  }, [cooldownDate])

  if (requestsCooldown && !isCooldownActive) {
    setRequestsCooldownRaw(null)

    setRequestsLeft(null)
  }

  const setRequestsCooldown = useCallback(
    (value: string | null) => {
      setRequestsCooldownRaw(value)
    },
    [setRequestsCooldownRaw]
  )

  return {
    requestsLeft,
    setRequestsLeft,
    requestsCooldown,
    cooldownDate,
    isCooldownActive,
    setRequestsCooldown
  }
}
