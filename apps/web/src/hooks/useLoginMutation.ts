import { loginService } from '@/services/authService'
import { LoginUserSchemaType } from '@monorepo/schemas'
import { AuthType } from '@monorepo/types'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

type LoginResponse = AxiosResponse<AuthType>

export const useLoginMutation = (
  options?: UseMutationOptions<LoginResponse, AxiosError, LoginUserSchemaType>
) => {
  return useMutation<LoginResponse, AxiosError, LoginUserSchemaType>({
    mutationFn: loginService,
    ...options
  })
}
