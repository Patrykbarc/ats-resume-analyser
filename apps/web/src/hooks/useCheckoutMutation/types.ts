import { UserSchemaType } from '@monorepo/schemas'
import Stripe from 'stripe'

type StripeSessionUrl = { url: Stripe.Checkout.Session['url'] }
type BuyerId = Pick<UserSchemaType, 'id'>

export type { BuyerId, StripeSessionUrl }
