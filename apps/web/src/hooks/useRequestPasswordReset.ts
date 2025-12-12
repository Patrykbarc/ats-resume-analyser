import { requestPasswordReset } from '@/services/authService'
import { ResendEmailValidationSchemaType } from '@monorepo/schemas'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useRequestPasswordReset = (
  options?: UseMutationOptions<
    unknown,
    AxiosError,
    ResendEmailValidationSchemaType['email']
  >
) => {
  return useMutation<
    unknown,
    AxiosError,
    ResendEmailValidationSchemaType['email']
  >((email: string) => requestPasswordReset(email), options)
}
