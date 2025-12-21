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
    const { id } = req.body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: 'price_1SdycYAeQW7NoIv71U80I4Lh', quantity: 1 }],
      success_url: `${FRONTEND_URL}/checkout/success?id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/checkout/cancel`,
      metadata: { userId: id }
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
    logger.info(`Received event: ${event.type}`)
  } catch (err) {
    logger.error(`Webhook signature verification failed: ${err}`)
    return res.status(400).send(`Webhook Error`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    if (!session.metadata?.userId) {
      logger.error(
        `Missing userId in session metadata. Metadata: ${JSON.stringify(session.metadata)}`
      )
      return res.status(400).send('Bad Request: Missing userId in metadata')
    }

    const userId = session.metadata.userId

    try {
      const now = new Date()
      const nextMonth = addMonths(now, 1)

      logger.info('Updating user subscription status in the database')

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
    logger.info(`Verifying session ID: ${id}`)

    const session = await stripe.checkout.sessions.retrieve(id as string, {
      expand: ['customer_details', 'subscription']
    })

    const userId = session.metadata?.userId
    logger.info(`Retrieved userId from session metadata: ${userId}`)

    if (!userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Missing userId in session metadata.'
      })
    }

    if (session.payment_status === 'paid' && session.status === 'complete') {
      return res.status(StatusCodes.OK).json({
        status: 'verified',
        sessionId: id,
        userId,
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

export const cancelSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.body

    logger.info(`Cancelling subscription for user: ${id}`)

    const user = await prisma.user.findUnique({
      where: { id }
    })

    if (!user || !user.stripeSubscriptionId) {
      logger.error(`User or subscription not found for userId: ${id}`)

      return res.status(StatusCodes.NOT_FOUND).json({
        error: 'User or subscription not found.'
      })
    }

    await stripe.subscriptions.update(user.stripeSubscriptionId, {
      cancel_at_period_end: true
    })

    logger.info(`Subscription for user ${id} set to cancel at period end.`)

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        subscriptionStatus: 'canceled'
      }
    })

    if (!updatedUser) {
      logger.error(
        `Failed to update subscription status in database for userId: ${id}`
      )

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to update subscription status in database.'
      })
    }

    logger.info(
      `User ${id} subscription status updated to 'canceled' in database.`
    )

    res.status(StatusCodes.OK).json({
      message: 'Subscription will be canceled at the end of the current period.'
    })
  } catch (error) {
    if (isStripeError(error)) {
      logger.error(
        `Stripe error while cancelling subscription: ${error.message}`
      )
    }

    handleError(error, res)
  }
}

export const resumeSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.body

    const user = await prisma.user.findUnique({ where: { id } })

    if (!user?.stripeSubscriptionId) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: 'Subscription not found.'
      })
    }

    const subscription = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId
    )

    if (
      subscription.status === 'canceled' ||
      !subscription.cancel_at_period_end
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Cannot resume this subscription.'
      })
    }

    await stripe.subscriptions.update(user.stripeSubscriptionId, {
      cancel_at_period_end: false
    })

    await prisma.user.update({
      where: { id },
      data: { subscriptionStatus: 'active' }
    })

    res.status(StatusCodes.OK).json({
      message: 'Subscription resumed successfully.'
    })
  } catch (error) {
    handleError(error, res)
  }
}
