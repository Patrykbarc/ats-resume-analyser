import { apiClient } from '@/api/apiClient'
import type { AiAnalysis } from '@monorepo/types'
import { AxiosResponse } from 'axios'
export type AnalyseResult = AxiosResponse<AiAnalysis>

export const submitAnalyseResume = async (
  file: File
): Promise<AnalyseResult> => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await apiClient.post<AiAnalysis>('/cv/analyze', formData, {
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
