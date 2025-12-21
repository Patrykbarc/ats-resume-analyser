import { restoreSubscriptionService } from '@/services/checkoutService'
import { User } from '@monorepo/database'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export type UserId = Pick<User, 'id'>

export const useRestoreSubscription = (
  options?: UseMutationOptions<AxiosResponse, AxiosError, UserId>
) => {
  return useMutation<AxiosResponse, AxiosError, UserId>({
    mutationFn: restoreSubscriptionService,
    ...options
  })
}
