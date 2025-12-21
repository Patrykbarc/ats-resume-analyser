import {
  Card,
  CardContainer,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { User } from '@monorepo/database'
import { CreditCard } from 'lucide-react'
import { CancelSubscription } from './components/cancel-subscription'
import { CanceledSubscriptionStatus } from './components/canceled-subscription-status'
import { NextBillingDate } from './types/types'

type SubscriptionDetailsCardProps = {
  id: User['id']
  subscriptionStatus?: User['subscriptionStatus']
  nextBillingDate: NextBillingDate
}

export function SubscriptionDetailsCard({
  id,
  subscriptionStatus,
  nextBillingDate
}: SubscriptionDetailsCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CreditCard className="size-5 text-primary" />
          <CardTitle>Current Subscription</CardTitle>
        </div>
        <CardDescription>Manage your subscription plan</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <CardContainer className="bg-muted/50">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-medium text-muted-foreground">Plan</h3>
          </div>

          {subscriptionStatus === 'active' && (
            <div className="space-y-6 grid grid-cols-1 md:grid-cols-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="font-medium">
                  $14.99{' '}
                  <span className="text-xs text-muted-foreground">
                    / monthly
                  </span>
                </p>
              </div>

              <CancelSubscription
                className="md:block hidden"
                id={id}
                nextBillingDate={nextBillingDate}
              />

              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Next Billing Date
                </p>
                <p className="text-base font-medium text-foreground">
                  {nextBillingDate}
                </p>
              </div>

              <CancelSubscription
                className="block md:hidden"
                id={id}
                nextBillingDate={nextBillingDate}
              />
            </div>
          )}
        </CardContainer>

        {subscriptionStatus === 'canceled' && (
          <CanceledSubscriptionStatus nextBillingDate={nextBillingDate} />
        )}
      </CardContent>
    </Card>
  )
}
