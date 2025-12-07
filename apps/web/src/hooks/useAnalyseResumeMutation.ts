import { AnalyseResult, submitAnalyseResume } from '@/services/analyseService'
import { useSessionState } from '@/stores/session/useSessionState'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useAnalyseResumeMutation = (
  options?: UseMutationOptions<AnalyseResult, AxiosError, File>
) => {
  const { isPremium } = useSessionState()

  return useMutation<AnalyseResult, AxiosError, File>({
    mutationFn: (file: File) => submitAnalyseResume(file, isPremium),
    ...options
  })
}
