import { AnalysisResults } from '@/components/analysis-results'
import { queryClient } from '@/main'
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
  loader: ({ params }) => {
    const { id } = params

    const analysisIdQueryOptions = getAnalysisOptions(id)
    return queryClient.ensureQueryData(analysisIdQueryOptions)
  },

  component: Analysis
})

function Analysis() {
  const { id } = useParams({ from: '/analyse/$id' })

  const { data: queryData } = useQuery(getAnalysisOptions(id))

  if (!queryData) {
    return null
  }

  if (!queryData.success) {
    return <div className="text-red-500">{queryData.error}</div>
  }

  return (
    <div>
      <div className="pb-4">
        <Link to="/" className="flex gap-2 items-center">
          <ArrowLeft size={16} /> Home
        </Link>
      </div>
      <AnalysisResults analysis={queryData.data} />
    </div>
  )
}
