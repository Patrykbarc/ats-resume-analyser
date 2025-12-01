import { RegisterForm } from '@/components/views/auth/register-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/register/')({
  component: RegisterPage
})

function RegisterPage() {
  return <RegisterForm />
}
