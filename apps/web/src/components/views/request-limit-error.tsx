import { AlertCircle } from 'lucide-react'

type RequestLimitErrorProps = {
  title?: string
  message?: string
  description?: string
}

export function RequestLimitError({
  title = 'Rate Limit Exceeded',
  message = 'You have reached your request limit',
  description = 'Or upgrade your plan for higher limits.'
}: RequestLimitErrorProps) {
  // const navigate = useNavigate()

  return (
    <div className="w-full mx-auto max-w-md space-y-8 rounded-lg border border-border bg-card p-8 text-center">
      <div className="flex justify-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {message && (
          <p className="text-lg font-semibold text-card-foreground">
            {message}
          </p>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        {/* TODO: Implement paywall */}
        {/* <Button
          onClick={() => navigate({ to: '/' })}
          variant="outline"
          className="w-full border-border text-foreground hover:bg-secondary sm:w-auto"
        >
          Back to Home
        </Button> */}
      </div>
    </div>
  )
}
