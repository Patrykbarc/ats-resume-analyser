import { QUERY_KEYS } from '@/constants/queryKeys'
import { checkoutSessionGuard } from '@/guards/checkoutSessionGuard'
import { useVerifyStripeSession } from '@/hooks/checkout/useVerifyStripeSession'
import { CheckoutSessionIdSchema } from '@monorepo/schemas'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useSearch } from '@tanstack/react-router'
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'
import { useEffect } from 'react'

export const Route = createFileRoute('/(app)/checkout/success/')({
  beforeLoad: async () => await checkoutSessionGuard(),
  component: SuccessPage,
  validateSearch: CheckoutSessionIdSchema
})

function SuccessPage() {
  const queryClient = useQueryClient()
  const { id } = useSearch({ from: '/(app)/checkout/success/' })
  const { data, isLoading, isError } = useVerifyStripeSession(id)

  useEffect(() => {
    if (data && !isError) {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.session.currentUser
      })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.subscription.user
      })
    }
  }, [data, isError, queryClient])

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <Loader2 className="size-10 text-primary animate-spin mx-auto mb-4" />
        <h1 className="text-xl">Verifying payment...</h1>
        <p className="text-muted-foreground">
          Please wait while we update your account.
        </p>
      </div>
    )
  }

  if (isError) {
    return (
      <Cancelled
        title="Verification Error"
        message="We couldn't confirm your payment. Please contact support if funds were deducted."
      />
    )
  }

  return (
    <div className="mb-8 text-center">
      <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-green-100 animate-in zoom-in duration-500">
        <CheckCircle2 className="size-10 text-green-800" aria-hidden="true" />
      </div>
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
        Payment Successful!
      </h1>
      <p className="text-lg text-muted-foreground text-pretty">
        Thank you for your purchase. Your order has been confirmed and you now
        have access to premium features.
      </p>
    </div>
  )
}

function Cancelled({
  title = 'Order Cancelled',
  message = 'Your payment was not completed. No charges have been made to your account.'
}: {
  title?: string
  message?: string
}) {
  return (
    <div className="mb-8 text-center">
      <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-destructive/10 animate-in zoom-in duration-500">
        <XCircle className="size-10 text-destructive" aria-hidden="true" />
      </div>
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
        {title}
      </h1>
      <p className="text-lg text-muted-foreground text-pretty">{message}</p>
    </div>
  )
}
