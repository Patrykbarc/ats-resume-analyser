import { QUERY_KEYS } from '@/constants/queryKeys'
import { verifyStripeSession } from '@/services/checkoutService'
import { useQuery } from '@tanstack/react-query'

const FIVE_MINUTES = 5 * 60 * 1000

export const useVerifyStripeSession = (sessionId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.stripe.session(sessionId),
    queryFn: async () => {
      verifyStripeSession(sessionId)
    },
    enabled: !!sessionId,
    staleTime: FIVE_MINUTES
  })
}
