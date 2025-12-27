import { RegisterForm } from '@/components/views/auth/register-form'
import { buildPageTitle } from '@/lib/buildPageTitle'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/register/')({
  component: RegisterPage,
  head: () => ({
    meta: [
      {
        title: buildPageTitle('Register')
      }
    ]
  })
})

function RegisterPage() {
  return <RegisterForm />
}
