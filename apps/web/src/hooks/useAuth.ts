import { useSessionStore } from '@/stores/session/useSessionStore'
import { isAxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { useCallback, useEffect } from 'react'
import { useGetCurrentUser } from './useGetCurrentUser'

export const useAuth = () => {
  const { data, error, isSuccess, isError, isFetched } = useGetCurrentUser()
  const { setUser, setIsUserLoggedIn, setIsLoading, setIsPremium } =
    useSessionStore()

  const isAuthenticated = !!sessionStorage.getItem('jwtToken')

  const resetUserState = useCallback(() => {
    setUser(null)
    setIsUserLoggedIn(false)
    setIsPremium(false)
  }, [setUser, setIsUserLoggedIn, setIsPremium])

  useEffect(() => {
    if (isSuccess && data) {
      setUser({ ...data })
      setIsUserLoggedIn(isAuthenticated && !!data)
      setIsPremium(data.isPremium)
    } else {
      resetUserState()

      setIsLoading(false)
    }

    const isUnauthorizedError =
      isAxiosError(error) && error.response?.status === StatusCodes.UNAUTHORIZED

    if (isUnauthorizedError) {
      resetUserState()

      sessionStorage.removeItem('jwtToken')
    }

    if (isFetched) {
      setIsLoading(false)
    }
  }, [
    isSuccess,
    isFetched,
    data,
    setUser,
    setIsUserLoggedIn,
    setIsLoading,
    setIsPremium,
    isAuthenticated,
    error,
    isError
  ])
}
