import { Skeleton } from '@/components/ui/skeleton'
import { AnalysisResults } from '@/components/views/analysis-results/analysis-results'
import { useGetAnalyseById } from '@/hooks/useGetAnalyseById'
import {
  createFileRoute,
  Link,
  useNavigate,
  useParams
} from '@tanstack/react-router'
import { StatusCodes } from 'http-status-codes'
import { ArrowLeft } from 'lucide-react'
export const Route = createFileRoute('/(app)/analyse/$id')({
  component: Analysis
})

function Analysis() {
  const { id } = useParams({ from: '/(app)/analyse/$id' })
  const navigate = useNavigate()
  const { data, isLoading, isError, error } = useGetAnalyseById(id)

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (isError) {
    if (error.status === StatusCodes.NOT_FOUND) {
      navigate({ to: '/404' })
    }

    return <div className="text-rose-500">{error.message}</div>
  }

  return (
    <div>
      <div className="pb-4">
        <Link to="/" className="flex gap-2 items-center">
          <ArrowLeft size={16} /> Home
        </Link>
      </div>
      <AnalysisResults analysis={data.data} />
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
