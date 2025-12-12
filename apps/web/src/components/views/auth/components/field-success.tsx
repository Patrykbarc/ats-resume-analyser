import { cn } from '@/lib/utils'

export function FieldSuccess({
  message,
  className
}: {
  message: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'p-4 text-sm text-green-800 bg-green-100 rounded-md',
        className
      )}
    >
      {message}
    </div>
  )
}
