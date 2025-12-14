import { apiClient } from '@/api/apiClient'
import { BuyerId, StripeSessionUrl } from '@/hooks/useCheckoutMutation/types'

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
