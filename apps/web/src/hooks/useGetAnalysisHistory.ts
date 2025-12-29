import { QUERY_KEYS } from '@/constants/query-keys'
import {
  AnalysisHistoryResponse,
  getAnalysisHistory
} from '@/services/analyseService'
import { AnalysisParamsWithLimit } from '@monorepo/schemas'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

const analysisOptions = ({ id, limit, page }: AnalysisParamsWithLimit) =>
  queryOptions<AxiosResponse<AnalysisHistoryResponse> | null, AxiosError>({
    queryKey: QUERY_KEYS.analysis.history(id),
    queryFn: () => getAnalysisHistory({ id, limit, page })
  })

export const useGetAnalysisHistory = ({
  id,
  limit,
  page
}: AnalysisParamsWithLimit) => {
  return useQuery(analysisOptions({ id, limit, page }))
}
