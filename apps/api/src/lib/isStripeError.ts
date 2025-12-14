import { Stripe } from 'stripe'

export function isStripeError(
  payload: unknown
): payload is Stripe.errors.StripeError {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'type' in payload &&
    (payload as { type?: string }).type === 'StripeInvalidRequestError'
  )
}
