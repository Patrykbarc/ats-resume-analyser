import { UserSchema } from '@monorepo/schemas'
import express, { Router } from 'express'
import {
  createCheckoutSession,
  stripeWebhookHandler
} from '../controllers/checkout.controller'
import { validateData } from '../middleware/validateEntries'

const router: Router = Router()

router.post(
  '/create-checkout-session',
  validateData(UserSchema.pick({ id: true })),
  createCheckoutSession
)

router.post(
  '/api/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhookHandler
)

export default router
