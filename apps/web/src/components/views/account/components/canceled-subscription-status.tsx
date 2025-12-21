import { CardContainer } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'
import { NextBillingDate } from '../types/types'

export function CanceledSubscriptionStatus({
  nextBillingDate
}: {
  nextBillingDate: NextBillingDate
}) {
  return (
    <CardContainer className="flex items-start gap-3 bg-destructive/10 border-destructive/20">
      <AlertTriangle className="size-5 text-destructive mt-0.5 hrink-0" />
      <div>
        <p className="text-sm font-medium text-destructive">
          Subscription Cancelled
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Your subscription has been cancelled and will expire on{' '}
          {nextBillingDate}. After that, you&apos;ll be switched to the Basic
          plan.
        </p>
      </div>
    </CardContainer>
  )
}
