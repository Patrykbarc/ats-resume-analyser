import { AnalyseResult, submitAnalyseResume } from '@/services/analyseService'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

export const useAnalyseResumeMutation = (
  options?: UseMutationOptions<AnalyseResult, Error, File>
) => {
  return useMutation<AnalyseResult, Error, File>({
    mutationFn: submitAnalyseResume,
    ...options
  })
}
