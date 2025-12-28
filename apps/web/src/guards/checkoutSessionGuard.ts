import { verifyStripeSession } from '@/services/checkoutService'
import { CheckoutSessionIdSchemaType } from '@monorepo/schemas'
import { redirect } from '@tanstack/react-router'

export async function checkoutSessionGuard(
  id: CheckoutSessionIdSchemaType['id']
) {
  try {
    return await verifyStripeSession(id)
  } catch (_) {
    throw redirect({ to: '/pricing' })
  }
}
