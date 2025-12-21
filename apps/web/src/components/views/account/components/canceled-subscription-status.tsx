import { Button } from '@/components/ui/button'
import { CardContainer } from '@/components/ui/card'
import { useRestoreSubscription } from '@/hooks/checkout/useRestoreSubscription'
import { useLoaderData } from '@tanstack/react-router'
import { AlertTriangle } from 'lucide-react'
import { NextBillingDate } from '../types/types'

export function CanceledSubscriptionStatus({
  nextBillingDate
}: {
  nextBillingDate: NextBillingDate
}) {
  const data = useLoaderData({ from: '/(app)/account/' })

  const { mutate, isPending } = useRestoreSubscription({
    onSuccess: () => {
      window.location.reload()
    }
  })

  function handleRestoreSubscription() {
    mutate({ id: data.id })
  }

  return (
    <CardContainer className="flex items-start gap-3 bg-destructive/10 border-destructive/20">
      <AlertTriangle className="size-5 text-destructive mt-0.5 hrink-0" />
      <div>
        <p className="text-sm font-medium text-destructive">
          Subscription Cancelled
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          <span>
            Your subscription has been cancelled and will expire on{' '}
            <span className="font-semibold">{nextBillingDate}</span>. After
            that, you&apos;ll be switched to the Basic plan.
          </span>
          <br />
          <span>
            You can restore your subscription at any time before it expires.
          </span>
        </p>

        <Button
          className="mt-4"
          size="sm"
          onClick={handleRestoreSubscription}
          disabled={isPending}
        >
          Restore subscription
        </Button>
      </div>
    </CardContainer>
  )
}
