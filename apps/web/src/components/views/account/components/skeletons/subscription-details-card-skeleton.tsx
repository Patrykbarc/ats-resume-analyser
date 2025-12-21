import {
  Card,
  CardContainer,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function SubscriptionDetailsCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Skeleton className="size-5 rounded-full" />
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
        </div>
        <CardDescription>
          <Skeleton className="h-4 w-56" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <CardContainer className="bg-muted/50">
          <div className="flex items-center gap-2 mb-1">
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-40" />
          </div>
        </CardContainer>
        <div className="grid gap-4">
          <CardContainer className="flex gap-3 p-3">
            <Skeleton className="size-5 rounded-full mt-0.5" />
            <div>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-5 w-28" />
            </div>
          </CardContainer>
        </div>
      </CardContent>
    </Card>
  )
}
