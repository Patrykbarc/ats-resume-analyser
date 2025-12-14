import { UserSchemaType } from '@monorepo/schemas'
import Stripe from 'stripe'

type StripeSessionUrl = { url: Stripe.Checkout.Session['url'] }
type StripeSessionId = { id: Stripe.Checkout.Session['id'] }
type BuyerId = Pick<UserSchemaType, 'id'>

export type { BuyerId, StripeSessionId, StripeSessionUrl }
