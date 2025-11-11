import { AnalyseResult, submitAnalyseResume } from '@/services/analyseService'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useAnalyseResumeMutation = (
  options?: UseMutationOptions<AnalyseResult, AxiosError, File>
) => {
  return useMutation<AnalyseResult, AxiosError, File>({
    mutationFn: submitAnalyseResume,
    ...options
  })
}
