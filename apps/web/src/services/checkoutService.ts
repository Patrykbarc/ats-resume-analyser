import { apiClient } from '@/api/apiClient'
import {
  BuyerId,
  StripeSessionId,
  StripeSessionUrl
} from '@/hooks/checkout/types/types'
import { UserId } from '@/hooks/checkout/useCancelSubscription'

export const handleBuyPremium = async (user: BuyerId) => {
  const userId = user.id

  const response = await apiClient.post<StripeSessionUrl>(
    '/checkout/create-checkout-session',
    {
      id: userId
    }
  )

  return response.data
}

export const verifyStripeSession = async (sessionId: string) => {
  const response = await apiClient<StripeSessionId>(
    '/checkout/verify-payment',
    {
      params: { id: sessionId }
    }
  )

  return response.data
}

export const cancelSubscriptionService = async (user: UserId) => {
  const response = await apiClient.post('/checkout/cancel-subscription', {
    id: user.id
  })

  return response
}
