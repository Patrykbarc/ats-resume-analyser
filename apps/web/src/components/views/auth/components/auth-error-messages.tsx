import { FieldError } from '@/components/ui/field'
import { AxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'

export function AuthErrorMessages({ error }: { error: AxiosError }) {
  if (error?.status === StatusCodes.UNAUTHORIZED) {
    return <FieldError>Invalid login or password</FieldError>
  }

  if (error?.status === StatusCodes.TOO_MANY_REQUESTS) {
    return (
      <FieldError>Too many login attempts. Please try again later.</FieldError>
    )
  }

  if (error?.status === StatusCodes.CONFLICT) {
    return (
      <FieldError>
        An account with the specified email address already exists.
      </FieldError>
    )
  }

  return <FieldError>Something went wrong. Please try again.</FieldError>
}
