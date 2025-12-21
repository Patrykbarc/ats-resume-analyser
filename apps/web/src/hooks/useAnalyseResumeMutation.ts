import { AnalyseResult, submitAnalyseResume } from '@/services/analyseService'
import { useSessionStore } from '@/stores/session/useSessionStore'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useAnalyseResumeMutation = (
  options?: UseMutationOptions<AnalyseResult, AxiosError, File>
) => {
  const { isPremium } = useSessionStore()

  return useMutation<AnalyseResult, AxiosError, File>({
    mutationFn: (file: File) => submitAnalyseResume(file, isPremium),
    ...options
  })
}
