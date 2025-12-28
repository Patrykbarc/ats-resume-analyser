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
import { AlertTriangle } from 'lucide-react'
import { UserBillingInformation } from '../types/types'

export function CancelSubscription({
  id,
  nextBillingDate,
  className
}: UserBillingInformation) {
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
          Cancel subscription
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-center items-center gap-2 mb-2">
            <AlertTriangle className="size-5 text-destructive" />
            <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="space-y-2">
            <span>
              Are you sure you want to cancel your Premium subscription?
              <br />
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
            Keep subscription
          </AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'secondary' })}
            onClick={() => mutate({ id })}
          >
            Yes, cancel
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
