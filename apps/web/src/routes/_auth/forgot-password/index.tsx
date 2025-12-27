import { ForgotPasswordForm } from '@/components/views/auth/forgot-password-form'
import { buildPageTitle } from '@/lib/buildPageTitle'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/forgot-password/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: buildPageTitle('Forgot Password')
      }
    ]
  })
})

function RouteComponent() {
  return <ForgotPasswordForm />
}
