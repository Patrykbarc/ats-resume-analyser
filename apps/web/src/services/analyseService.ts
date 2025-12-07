import { apiClient } from '@/api/apiClient'
import type { AiAnalysis } from '@monorepo/types'
import { AxiosResponse } from 'axios'
export type AnalyseResult = AxiosResponse<AiAnalysis>

export const submitAnalyseResume = async ({
  file,
  isPremium = false
}: {
  file: File
  isPremium?: boolean
}): Promise<AnalyseResult> => {
  const formData = new FormData()
  formData.append('file', file)

  const route = isPremium ? '/cv/analyze/premium' : '/cv/analyze'

  const response = await apiClient.post<AiAnalysis>(route, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response
}

export const getAnalysis = async (id: string): Promise<AnalyseResult> => {
  const response = await apiClient.get<AiAnalysis>(`/cv/analysis/${id}`)

  return response
}
