import { AnalysisResults } from '@/components/analysis-results'
import { Skeleton } from '@/components/ui/skeleton'
import { getAnalysis } from '@/services/analyseService'
import { AnalysisParamsSchema } from '@monorepo/schemas'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

const getAnalysisOptions = (id: string) =>
  queryOptions({
    queryKey: ['analysis', id],
    queryFn: () => getAnalysis(id),
    staleTime: Infinity
  })

export const Route = createFileRoute('/analyse/$id')({
  parseParams: (params) => AnalysisParamsSchema.parse(params),
  component: Analysis
})

function Analysis() {
  const { id } = useParams({ from: '/analyse/$id' })
  const {
    data: queryData,
    isLoading,
    isError
  } = useQuery(getAnalysisOptions(id))

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (isError) {
    return (
      <div className="text-rose-500">
        An error has occurred. Please try again.
      </div>
    )
  }

  return (
    <div>
      <div className="pb-4">
        <Link to="/" className="flex gap-2 items-center">
          <ArrowLeft size={16} /> Home
        </Link>
      </div>
      {queryData.success && <AnalysisResults analysis={queryData.data} />}
    </div>
  )
}

function LoadingSkeleton() {
  const commonClasses = 'h-[456px] md:h-64 w-full'

  return (
    <div className="space-y-6">
      <Skeleton className="h-6 pb-4 w-[70px]" />
      <Skeleton className="h-8 w-[183px]" />
      <Skeleton className={commonClasses} />
      <Skeleton className={commonClasses} />
      <Skeleton className={commonClasses} />
      <Skeleton className={commonClasses} />
    </div>
  )
}
