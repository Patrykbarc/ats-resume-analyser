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
import { useCancelSubscription } from '@/hooks/checkout/useCancelSubscription'
import { cn } from '@/lib/utils'
import { User } from '@monorepo/database'
import { AlertTriangle } from 'lucide-react'
import { NextBillingDate } from '../types/types'

export function CancelSubscription({
  id,
  nextBillingDate,
  className
}: {
  id: User['id']
  nextBillingDate: NextBillingDate
  className?: string
}) {
  const { isPending, mutate } = useCancelSubscription({
    onSuccess: () => {
      window.location.reload()
    }
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger className={className} asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-fit md:ml-auto"
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
              Are you sure you want to cancel your Premium subscription?
            </span>
            <span className="text-sm text-muted-foreground mt-2">
              Your subscription will remain active until {nextBillingDate}.
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
  )
}
