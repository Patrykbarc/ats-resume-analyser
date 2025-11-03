import { z } from 'zod'

const analysisParamsSchema = z.object({
  id: z.string()
})

export { analysisParamsSchema }
