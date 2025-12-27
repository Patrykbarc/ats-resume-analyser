import { QUERY_KEYS } from '@/constants/query-keys'
import { AnalyseResult, getAnalysis } from '@/services/analyseService'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

const analysisOptions = (id: string) =>
  queryOptions<AnalyseResult, AxiosError>({
    queryKey: QUERY_KEYS.analysis.byId(id),
    queryFn: () => getAnalysis(id)
  })

export const useGetAnalyseById = (id: string) => {
  return useQuery(analysisOptions(id))
}
