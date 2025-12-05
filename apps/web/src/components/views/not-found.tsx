import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { buttonVariants } from '../ui/button'

export function NotFound() {
  return (
    <div className="grid h-full items-center pb-18">
      <div>
        <div className="mb-8 text-center">
          <p className="text-9xl font-bold text-accent mb-4">404</p>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground">
            Sorry, the page you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            to="/"
            className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
