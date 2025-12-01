import { apiClient } from '@/api/apiClient'
import {
  LoginUserSchemaType,
  RegisterUserSchemaType,
  VerifyUserSchemaType
} from '@monorepo/schemas'
import { AuthType, VerifyUserApiResponse } from '@monorepo/types'
import { isAxiosError } from 'axios'
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

  return response
}

export const verifyUserService = async (token: VerifyUserSchemaType) => {
  try {
    await apiClient.post<VerifyUserApiResponse>('/auth/verify', { ...token })

    return { status: StatusCodes.OK }
  } catch (error) {
    if (!isAxiosError(error)) {
      return { status: StatusCodes.INTERNAL_SERVER_ERROR }
    }

    if (error.response) {
      return {
        status: error.response.status
      }
    }

    return { status: StatusCodes.INTERNAL_SERVER_ERROR }
  }
}

export const resendVerificationLink = async (token: VerifyUserSchemaType) => {
  const response = await apiClient.post<VerifyUserApiResponse>(
    '/auth/verify/resend',
    { ...token }
  )

  return response.data
}
