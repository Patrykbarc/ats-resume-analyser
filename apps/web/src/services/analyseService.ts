import { apiClient } from '@/api/apiClient'
import type { AiAnalysis } from '@monorepo/types'
import { AxiosResponse } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { errorHandler } from './helper/errorHandler'

export type AnalyseResult =
  | { success: true; data: AiAnalysis }
  | { success: false; error: string }

export const analyseResume = async (file: File): Promise<AnalyseResult> => {
  try {
    if (!file) {
      return {
        success: false,
        error: 'No file selected'
      }
    }

    if (file.type !== 'application/pdf') {
      return {
        success: false,
        error: 'Invalid file format. Only PDF files are allowed.'
      }
    }

    const formData = new FormData()
    formData.append('file', file)

    const response = await apiClient.post<AiAnalysis>('/cv/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return handleResponse(response)
  } catch (error) {
    return errorHandler(error)
  }
}

export const getAnalysis = async (id: string): Promise<AnalyseResult> => {
  try {
    const response = await apiClient.get<AiAnalysis>(`/cv/analysis/${id}`)

    return handleResponse(response)
  } catch (error) {
    return errorHandler(error)
  }
}

const handleResponse = (response: AxiosResponse): AnalyseResult => {
  if (response.status === StatusCodes.OK) {
    return {
      success: true,
      data: response.data
    }
  }

  return {
    success: false,
    error: 'Unexpected response status'
  }
}
