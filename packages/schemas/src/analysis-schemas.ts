import { z } from 'zod/v4'

const AnalysisParamsSchema = z.object({
  id: z.string()
})

export { AnalysisParamsSchema }
