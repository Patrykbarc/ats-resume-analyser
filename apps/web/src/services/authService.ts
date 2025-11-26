import { apiClient } from '@/api/apiClient'
import { LoginUserSchemaType, RegisterUserSchemaType } from '@monorepo/schemas'
import { AuthType } from '@monorepo/types'
import { StatusCodes } from 'http-status-codes'

export const loginService = async (value: LoginUserSchemaType) => {
  const response = await apiClient.post<AuthType>('/auth/login', {
    ...value
  })

  sessionStorage.setItem('jwtToken', response.data.token)
  sessionStorage.setItem('user_id', response.data.user_id)

  return response
}

export const registerService = async (value: RegisterUserSchemaType) => {
  const response = await apiClient.post<AuthType>('/auth/register', {
    ...value
  })

  if (response.status === StatusCodes.CREATED) {
    // TODO add e-mail confirmation via SMTP
  }

  return response
}
