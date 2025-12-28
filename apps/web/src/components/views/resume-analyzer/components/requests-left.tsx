import { useRateLimit } from '@/hooks/useRateLimit'
import { useSessionStore } from '@/stores/session/useSessionStore'
import { FREE_REQUESTS_PER_DAY } from '@monorepo/constants'

export function RequestsLeft() {
  const { requestsLeft } = useRateLimit()
  const { isPremium, isLoading } = useSessionStore()

  if (isPremium || isLoading) {
    return null
  }

  if (requestsLeft !== 0) {
    return (
      <p className="text-center">
        Requests left:{' '}
        <span className="font-medium">
          {requestsLeft ?? FREE_REQUESTS_PER_DAY}
        </span>
      </p>
    )
  }

  return null
}
