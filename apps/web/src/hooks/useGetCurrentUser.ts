import { getCurrentUserService } from '@/services/authService'
import { UserSchemaType } from '@monorepo/schemas'
import { useQuery } from '@tanstack/react-query'

export const useGetCurrentUser = () => {
  return useQuery<UserSchemaType>({
    queryKey: ['currentUser'],
    queryFn: getCurrentUserService,
    retry: false,
    staleTime: 5 * 60 * 1000 // 5 minutes
  })
}
