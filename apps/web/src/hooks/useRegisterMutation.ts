import { registerService } from '@/services/authService'
import { RegisterUserSchemaType } from '@monorepo/schemas'
import { AuthType } from '@monorepo/types'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

type LoginResponse = AxiosResponse<AuthType>

export const useRegisterMutation = (
  options?: UseMutationOptions<
    LoginResponse,
    AxiosError,
    RegisterUserSchemaType
  >
) => {
  return useMutation<LoginResponse, AxiosError, RegisterUserSchemaType>({
    mutationFn: registerService,
    ...options
  })
}
