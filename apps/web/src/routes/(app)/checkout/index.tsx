import { Spinner } from '@/components/ui/spinner'
import { checkoutSessionGuard } from '@/guards/checkoutSessionGuard'
import { buildPageTitle } from '@/lib/buildPageTitle'
import { CheckoutSessionIdSchema } from '@monorepo/schemas'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/checkout/')({
  validateSearch: CheckoutSessionIdSchema,
  beforeLoad: async ({ search }) => await checkoutSessionGuard(search.id),
  component: PaymentVerification,
  head: () => ({
    meta: [
      {
        title: buildPageTitle('Verifying payment...')
      }
    ]
  })
})

function PaymentVerification() {
  return (
    <div className="p-4 gap-3 flex justify-center items-center mx-auto">
      <Spinner />
      <p>Verifying payment...</p>
    </div>
  )
}
