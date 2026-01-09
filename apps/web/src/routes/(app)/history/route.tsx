import { AnalysisHistory } from '@/components/views/analysis-history/analysis-history'
import { withSessionGuard } from '@/guards/withSessionGuard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/history')({
  beforeLoad: async ({ context: { queryClient } }) =>
    withSessionGuard({ queryClient }),
  component: AnalysisHistory
})
