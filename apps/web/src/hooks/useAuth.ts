import { useSessionStore } from '@/stores/session/useSessionStore'
import { isAxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { useEffect } from 'react'
import { useGetCurrentUser } from './useGetCurrentUser'

export const useAuth = () => {
  const {
    data,
    error,
    isSuccess,
    isFetched,
    isLoading: queryLoading
  } = useGetCurrentUser()
  const {
    setUser,
    setIsUserLoggedIn,
    setIsLoading,
    setIsPremium,
    resetUserState
  } = useSessionStore()

  const token = localStorage.getItem('jwtToken')

  useEffect(() => {
    if (!token) {
      resetUserState()
      setIsLoading(false)
      return
    }

    setIsLoading(queryLoading)

    if (isFetched) {
      if (isSuccess && data) {
        setUser({ ...data })
        setIsUserLoggedIn(true)
        setIsPremium(data.isPremium)
      } else {
        resetUserState()

        const isUnauthorized =
          isAxiosError(error) &&
          error.response?.status === StatusCodes.UNAUTHORIZED
        if (isUnauthorized) {
          localStorage.removeItem('jwtToken')
        }
      }
    }
  }, [
    isSuccess,
    isFetched,
    queryLoading,
    data,
    error,
    token,
    setUser,
    setIsUserLoggedIn,
    setIsPremium,
    setIsLoading,
    resetUserState
  ])
}
