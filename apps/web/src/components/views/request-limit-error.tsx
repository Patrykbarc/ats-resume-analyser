import { useRateLimit } from '@/hooks/useRateLimit'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { AlertCircle } from 'lucide-react'
import { buttonVariants } from '../ui/button'

export function RequestLimitError() {
  const { requestsCooldown } = useRateLimit()

  return (
    <div className="w-full mx-auto max-w-md space-y-8 rounded-lg border border-border bg-card p-8 text-center">
      <div className="flex justify-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-2xl font-bold text-foreground">
          Rate Limit Exceeded
        </h1>

        <p className="text-sm text-card-foreground max-w-80 mx-auto">
          The limit will be renewed at <strong>{requestsCooldown}</strong>.
        </p>

        <Link to="/pricing" className={cn(buttonVariants(), 'mt-3')}>
          Upgrade your plan for unlimited analyses
        </Link>
      </div>
    </div>
  )
}
