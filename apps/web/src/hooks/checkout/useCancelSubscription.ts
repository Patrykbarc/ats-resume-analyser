import { cancelSubscriptionService } from '@/services/checkoutService'
import { User } from '@monorepo/database'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export type UserId = Pick<User, 'id'>

export const useCancelSubscription = (
  options?: UseMutationOptions<undefined, AxiosError, UserId>
) => {
  return useMutation<undefined, AxiosError, UserId>({
    mutationFn: cancelSubscriptionService,
    ...options
  })
}
