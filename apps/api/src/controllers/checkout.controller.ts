import { addMonths } from 'date-fns'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Stripe from 'stripe'
import { getEnvs } from '../lib/getEnv'
import { isStripeError } from '../lib/isStripeError'
import { logger, prisma } from '../server'
import { handleError } from './helper/handleError'

const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, FRONTEND_URL } = getEnvs()

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  typescript: true
})

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: 'price_1SdycYAeQW7NoIv71U80I4Lh', quantity: 1 }],
      success_url: `${FRONTEND_URL}/checkout/success?sid={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/checkout/cancel`,
      metadata: { userId }
    })

    const { url } = session

    res.status(StatusCodes.OK).json({ url })
  } catch (error) {
    handleError(error, res)
  }
}

export const stripeWebhookHandler = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    logger.error(`Webhook signature verification failed: ${err}`)
    return res.status(400).send(`Webhook Error`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    if (!session.metadata?.userId) {
      logger.error('Missing userId in session metadata.')
      return res.status(400).send('Bad Request: Missing userId in metadata')
    }

    const userId = session.metadata.userId

    try {
      const now = new Date()
      const nextMonth = addMonths(now, 1)

      const updatedUser = await prisma.user.update({
        data: {
          isPremium: true,
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: session.subscription as string,
          subscriptionCurrentPeriodEnd: nextMonth,
          subscriptionStartedAt: now,
          subscriptionStatus: 'active'
        },
        where: { id: userId }
      })

      if (!updatedUser) {
        logger.error(`User with ID ${userId} was not found.`)
        return res.status(404).send('User not found')
      }

      logger.info(`Payment completed for user ${userId}`)
    } catch (error) {
      logger.error(`Error updating user ${userId}: ${error}`)
      return res.status(500).send('Internal Server Error')
    }
  }

  res.status(200).send('Webhook received')
}

export const verifyPaymentSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.query

    const session = await stripe.checkout.sessions.retrieve(id as string, {
      expand: ['customer_details', 'subscription']
    })

    if (session.payment_status === 'paid' && session.status === 'complete') {
      return res.status(StatusCodes.OK).json({
        status: 'verified',
        customerEmail: session.customer_details?.email
      })
    } else {
      logger.warn(
        `Session ${id} not marked as paid. Status: ${session.payment_status}`
      )

      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Payment session not completed or invalid.',
        payment_status: session.payment_status
      })
    }
  } catch (error) {
    if (isStripeError(error)) {
      logger.error(`Stripe error while verifying session: ${error.message}`)
    }

    handleError(error, res)
  }
}
