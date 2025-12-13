import { resetPassword } from '@/services/authService'
import { ResetPasswordSchemaType } from '@monorepo/schemas'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useResetPassword = (
  options: UseMutationOptions<unknown, AxiosError, ResetPasswordSchemaType>
) => {
  return useMutation({
    mutationFn: (data: {
      token: string
      password: string
      confirmPassword: string
    }) => resetPassword(data),
    ...options
  })
}
