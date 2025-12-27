import { CardContainer } from '@/components/ui/card'
import { useLoaderData } from '@tanstack/react-router'
import { AlertTriangle } from 'lucide-react'
import { NextBillingDate } from '../types/types'
import { RestoreSubscription } from './restore-subscription'

export function CanceledSubscriptionStatus({
  nextBillingDate
}: {
  nextBillingDate: NextBillingDate
}) {
  const data = useLoaderData({ from: '/(app)/account/' })

  if (!data) {
    return null
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

        <RestoreSubscription id={data.id} className="mt-4" />
      </div>
    </CardContainer>
  )
}
