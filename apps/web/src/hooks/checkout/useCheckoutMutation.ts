import { handleBuyPremium } from '@/services/checkoutService'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { BuyerId, StripeSessionUrl } from './types/types'

export const useCheckoutMutation = (
  options?: UseMutationOptions<StripeSessionUrl, AxiosError, BuyerId>
) => {
  return useMutation<StripeSessionUrl, AxiosError, BuyerId>({
    mutationFn: handleBuyPremium,
    ...options
  })
}
