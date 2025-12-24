import { getCheckoutSessionStatus } from '@/services/checkoutService'
import { redirect } from '@tanstack/react-router'

export async function checkoutSessionGuard() {
  try {
    await getCheckoutSessionStatus()
  } catch (_) {
    throw redirect({ to: '/pricing' })
  }
}
