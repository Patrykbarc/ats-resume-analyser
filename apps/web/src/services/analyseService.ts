import { apiClient } from '@/api/apiClient'
import { User } from '@monorepo/database'
import type { AiAnalysis } from '@monorepo/types'
import { AxiosResponse } from 'axios'
export type AnalyseResult = AxiosResponse<AiAnalysis>

export const submitAnalyseResume = async ({
  file,
  isPremium,
  userId
}: {
  file: File
  isPremium: boolean
  userId?: User['id']
}): Promise<AnalyseResult> => {
  const formData = new FormData()
  formData.append('file', file)

  const route = () => {
    if (isPremium) {
      return '/cv/analyze/premium'
    }

    if (userId && !isPremium) {
      return '/cv/analyze/signed-in'
    }

    return '/cv/analyze/free'
  }

  const response = await apiClient.post<AiAnalysis>(route(), formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response
}

export const getAnalysis = async (id: string): Promise<AnalyseResult> => {
  const response = await apiClient<AiAnalysis>(`/cv/analysis/${id}`)

  return response
}
