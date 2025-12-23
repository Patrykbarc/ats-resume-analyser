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
import { useRestoreSubscription } from '@/hooks/checkout/useRestoreSubscription'
import { cn } from '@/lib/utils'
import { User } from '@monorepo/database'
import { AlertTriangle } from 'lucide-react'

export function RestoreSubscription({
  id,
  className
}: {
  id: User['id']
  className?: string
}) {
  const { isPending, mutate } = useRestoreSubscription({
    onSuccess: () => {
      window.location.reload()
    }
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger className={className} asChild>
        <Button
          variant="default"
          size="sm"
          className="w-fit md:ml-auto"
          disabled={isPending}
        >
          Restore subscription
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <AlertDialogTitle>Restore subscription</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="space-y-2">
            <span>
              Are you sure you want to restore your Premium subscription?
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={cn(buttonVariants({ variant: 'secondary' }))}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ variant: 'default' }))}
            onClick={() => mutate({ id })}
          >
            Yes, restore
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
