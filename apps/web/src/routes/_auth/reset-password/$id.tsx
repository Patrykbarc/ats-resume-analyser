import { ResetPasswordForm } from '@/components/views/auth/reset-password-form'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/reset-password/$id')({
  component: RouteComponent
})

function RouteComponent() {
  const { id } = useParams({ from: '/_auth/reset-password/$id' })

  return <ResetPasswordForm token={id} />
}
