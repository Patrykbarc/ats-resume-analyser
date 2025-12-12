import { resetPassword } from '@/services/authService'
import { useMutation } from '@tanstack/react-query'

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: {
      token: string
      password: string
      confirmPassword: string
    }) => resetPassword(data)
  })
}
