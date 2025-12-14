import z from 'zod'

const CheckoutSessionIdSchema = z.object({
  id: z.string().min(1, 'Session ID is required.')
})

type CheckoutSessionIdSchemaType = z.infer<typeof CheckoutSessionIdSchema>

export { CheckoutSessionIdSchema, type CheckoutSessionIdSchemaType }
