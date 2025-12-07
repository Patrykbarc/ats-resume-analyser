enum AuthErrorCodes {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  NOT_CONFIRMED = "ACCOUNT_IS_NOT_CONFIRMED",
  ACCESS_TOKEN_EXPIRED = 'ACCESS_TOKEN_EXPIRED',
  REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED'
}

type AuthType = { token: string; refresh_token: string }

type VerifyUserApiResponse = {
  message: string
}

export { AuthErrorCodes }
export type { AuthType, VerifyUserApiResponse }
