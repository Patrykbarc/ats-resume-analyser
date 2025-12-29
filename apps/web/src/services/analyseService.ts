import { apiClient } from '@/api/apiClient'
import type { RequestLog, User } from '@monorepo/database'
import { AnalysisParamsWithLimit } from '@monorepo/schemas'
import type { AiAnalysis, Pagination } from '@monorepo/types'
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

export type AnalysisHistoryResponse = {
  logs: Pick<RequestLog, 'analyseId' | 'fileName' | 'fileSize' | 'createdAt'>[]
  pagination: Pagination
}

export const getAnalysisHistory = async ({
  id,
  limit,
  page
}: AnalysisParamsWithLimit) => {
  if (!id) {
    return null
  }

  const response = await apiClient(`/cv/analysis-history/${id}`, {
    params: { limit, page }
  })

  return response
}
