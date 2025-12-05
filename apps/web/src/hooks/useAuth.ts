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
    if (isSuccess && data) {
      setUser(data)
      setIsUserLoggedIn(isAuthenticated && !!data)
      setIsLoading(false)
    }

    const isUnauthorizedError =
      isAxiosError(error) && error.response?.status === StatusCodes.UNAUTHORIZED

    if (isUnauthorizedError) {
      setUser(null)
      setIsUserLoggedIn(false)
      setIsLoading(false)
    }

    if (isLoading) {
      setIsLoading(true)
    }
  }, [
    isSuccess,
    data,
    setUser,
    setIsUserLoggedIn,
    setIsLoading,
    isAuthenticated,
    isLoading,
    error
  ])
}
