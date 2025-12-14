import { CheckoutSessionIdSchema, UserSchema } from '@monorepo/schemas'
import express, { Router } from 'express'
import {
  createCheckoutSession,
  stripeWebhookHandler,
  verifyPaymentSession
} from '../controllers/checkout.controller'
import { validateData } from '../middleware/validateEntries'

const router: Router = Router()

// TODO: add JWT auth middleware to protect routes below

router.post(
  '/create-checkout-session',
  validateData(UserSchema.pick({ id: true })),
  createCheckoutSession
)

router.post(
  '/checkout-session-webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhookHandler
)

router.get(
  '/verify-payment',
  validateData(CheckoutSessionIdSchema),
  verifyPaymentSession
)

export default router
