import { getCurrentUserService } from '@/services/authService'
import { UserSchemaType } from '@monorepo/schemas'
import { useQuery } from '@tanstack/react-query'

const FIVE_MINUTES = 5 * 60 * 1000

export const useGetCurrentUser = () => {
  const token = sessionStorage.getItem('jwtToken')
  
  return useQuery<UserSchemaType | null>({
    queryKey: ['currentUser'],
    queryFn: getCurrentUserService,
    retry: false,
    staleTime: FIVE_MINUTES,
    enabled: !!token
  })
}
