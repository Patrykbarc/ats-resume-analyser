import { CheckoutSessionIdSchema } from '@monorepo/schemas'
import express, { Router } from 'express'
import {
  cancelSubscription,
  createCheckoutSession,
  stripeWebhookHandler,
  verifyPaymentSession
} from '../controllers/checkout.controller'
import { requireAuth } from '../middleware/auth.middleware'
import { validateData } from '../middleware/validateEntries'

const router: Router = Router()

router.post(
  '/create-checkout-session',
  requireAuth,
  validateData(CheckoutSessionIdSchema),
  createCheckoutSession
)

router.post(
  '/checkout-session-webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhookHandler
)

router.get(
  '/verify-payment',
  requireAuth,
  validateData(CheckoutSessionIdSchema),
  verifyPaymentSession
)

router.get(
  '/cancel-subscription',
  requireAuth,
  validateData(CheckoutSessionIdSchema),
  cancelSubscription
)

export default router
