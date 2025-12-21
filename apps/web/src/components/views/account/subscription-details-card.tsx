import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContainer,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useCancelSubscription } from '@/hooks/checkout/useCancelSubscription'
import { cn } from '@/lib/utils'
import { User } from '@monorepo/database'
import { format } from 'date-fns'
import { AlertTriangle, Calendar, CreditCard } from 'lucide-react'

type SubscriptionDetailsCardProps = {
  id: User['id']
  subscriptionStatus?: User['subscriptionStatus']
  subscriptionCurrentPeriodEnd?: User['subscriptionCurrentPeriodEnd']
}

export function SubscriptionDetailsCard({
  id,
  subscriptionStatus,
  subscriptionCurrentPeriodEnd
}: SubscriptionDetailsCardProps) {
  const { isPending, mutate } = useCancelSubscription()

  const nextBillingDate =
    subscriptionCurrentPeriodEnd &&
    format(subscriptionCurrentPeriodEnd, 'MMMM dd, yyyy')

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
            <h3 className="text-xl font-semibold text-foreground">Plan</h3>
          </div>
          {subscriptionStatus === 'active' && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="font-medium">
                $14.99{' '}
                <span className="text-xs text-muted-foreground">/ monthly</span>
              </p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto bg-transparent"
                    disabled={isPending}
                  >
                    Cancel Subscription
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="space-y-2">
                      <span>
                        Are you sure you want to cancel your Premium
                        subscription?
                      </span>
                      <span className="text-sm text-muted-foreground mt-2">
                        Your subscription will remain active until{' '}
                        {nextBillingDate}.
                      </span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      className={cn(
                        buttonVariants({ variant: 'default' }),
                        'hover:text-white'
                      )}
                    >
                      Keep Subscription
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className={buttonVariants({ variant: 'secondary' })}
                      onClick={() => mutate({ id })}
                    >
                      Yes, Cancel
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </CardContainer>

        {subscriptionStatus === 'active' && (
          <div className="grid gap-4">
            <CardContainer className="flex gap-3 p-3">
              <Calendar className="size-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Next Billing Date
                </p>
                <p className="text-base font-semibold text-foreground">
                  {nextBillingDate}
                </p>
              </div>
            </CardContainer>
          </div>
        )}

        {subscriptionStatus === 'canceled' && (
          <CardContainer className="flex items-start gap-3 bg-destructive/10 border-destructive/20">
            <AlertTriangle className="size-5 text-destructive mt-0.5 hrink-0" />
            <div>
              <p className="text-sm font-medium text-destructive">
                Subscription Cancelled
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Your subscription has been cancelled and will expire on{' '}
                {nextBillingDate}. After that, you&apos;ll be switched to the
                Basic plan.
              </p>
            </div>
          </CardContainer>
        )}
      </CardContent>
    </Card>
  )
}
