import { useGetCurrentUser } from './useGetCurrentUser'

const isUserAuthenticated = (): boolean => {
  const token = sessionStorage.getItem('jwtToken')

  return !!token
}

export const useAuth = () => {
  const isAuthenticated = isUserAuthenticated()
  const { data, isLoading, error } = useGetCurrentUser()

  return {
    isAuthenticated,
    user: data,
    isLoading,
    error,
    isUserLoggedIn: isAuthenticated && !!data
  }
}
