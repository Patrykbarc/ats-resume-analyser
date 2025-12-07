import { useSessionState } from '@/stores/session/useSessionState'
import { isAxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { useEffect } from 'react'
import { useGetCurrentUser } from './useGetCurrentUser'

export const useAuth = () => {
  const { data, isLoading, error, isSuccess } = useGetCurrentUser()
  const { setUser, setIsUserLoggedIn, setIsLoading, setIsPremium } =
    useSessionState()

  const isAuthenticated = !!sessionStorage.getItem('jwtToken')
  useEffect(() => {
    if (isSuccess && data) {
      setUser({ ...data })
      setIsUserLoggedIn(isAuthenticated && !!data)
      setIsPremium(data.isPremium)
      setIsLoading(false)
    }

    const isUnauthorizedError =
      isAxiosError(error) && error.response?.status === StatusCodes.UNAUTHORIZED

    if (isUnauthorizedError) {
      setUser(null)
      setIsUserLoggedIn(false)
      setIsPremium(false)
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
