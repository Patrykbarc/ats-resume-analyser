import { useSessionState } from '@/stores/session/useSessionState'
import { isAxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { useEffect } from 'react'
import { useGetCurrentUser } from './useGetCurrentUser'

export const useAuth = () => {
  const { data, isLoading, error, isSuccess } = useGetCurrentUser()
  const { setUser, setIsUserLoggedIn, setIsLoading } = useSessionState()

  const isAuthenticated = !!sessionStorage.getItem('jwtToken')

  useEffect(() => {
    if (isSuccess) {
      setUser(data)
      setIsUserLoggedIn(isAuthenticated && !!data)
      setIsLoading(isLoading)
    }

    const isUnauthorizedError =
      isAxiosError(error) && error.response?.status === StatusCodes.UNAUTHORIZED

    if (isUnauthorizedError) {
      setUser(null)
      setIsUserLoggedIn(false)
      setIsLoading(isLoading)
    }
  }, [isSuccess, data, setUser, setIsUserLoggedIn, isAuthenticated])
}
