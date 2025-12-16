import { AnalysisResults } from '@/components/views/analysis-results/analysis-results'
import { AnalysisSkeletonWithNavigation } from '@/components/views/analysis-results/components/analysis-results-skeleton'
import { NotFound } from '@/components/views/not-found'
import { useGetAnalyseById } from '@/hooks/useGetAnalyseById'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { StatusCodes } from 'http-status-codes'
import { ArrowLeft } from 'lucide-react'
export const Route = createFileRoute('/(app)/analyse/$id')({
  component: Analysis
})

function Analysis() {
  const { id } = useParams({ from: '/(app)/analyse/$id' })
  const { data, isLoading, isError, error } = useGetAnalyseById(id)

  if (isLoading) {
    return <AnalysisSkeletonWithNavigation />
  }

  if (isError) {
    if (error.status === StatusCodes.NOT_FOUND) {
      return <NotFound />
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
