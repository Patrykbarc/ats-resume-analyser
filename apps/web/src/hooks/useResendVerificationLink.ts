import { resendVerificationLink } from '@/services/authService'
import { AuthType, VerifyUserApiResponse } from '@monorepo/types'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

type Token = Pick<AuthType, 'token'>

export const useResendVerificationLink = (
  options?: UseMutationOptions<VerifyUserApiResponse, AxiosError, Token>
) => {
  return useMutation<VerifyUserApiResponse, AxiosError, Token>({
    mutationFn: resendVerificationLink,
    ...options
  })
}
