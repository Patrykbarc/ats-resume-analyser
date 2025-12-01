import { LoginForm } from '@/components/views/auth/login-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/login/')({
  component: LoginPage
})

function LoginPage() {
  return <LoginForm />
}
