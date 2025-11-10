import { AnalyseResult, getAnalysis } from '@/services/analyseService'
import { queryOptions, useQuery } from '@tanstack/react-query'

const analysisOptions = (id: string) =>
  queryOptions<AnalyseResult, Error>({
    queryKey: ['analysis', id],
    queryFn: () => getAnalysis(id),
    staleTime: Infinity,
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false
  })

export const useGetAnalyseById = (id: string) => {
  return useQuery(analysisOptions(id))
}
