import { Spinner } from '@/components/ui/spinner'
import { logoutService } from '@/services/authService'
import { useSessionState } from '@/stores/session/useSessionState'
import { createFileRoute, redirect } from '@tanstack/react-router'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/_auth/logout/')({
  beforeLoad: async () => {
    await logoutService()

    const { setUser, setAuthToken, setIsUserLoggedIn } =
      useSessionState.getState()

    setUser(null)
    setAuthToken(null)
    setIsUserLoggedIn(false)
    toast.success('Logged out successfully!')

    throw redirect({ to: '/' })
  },
  component: LogoutComponent,
  errorComponent: ErrorComponent
})

function LogoutComponent() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Spinner />
      <p className="text-center">Logging out...</p>
    </div>
  )
}

function ErrorComponent() {
  return (
    <div className="flex items-center justify-center gap-4">
      <p className="text-destructive text-sm font-normal">
        An error occurred during logout. Please try again.
      </p>
    </div>
  )
}
