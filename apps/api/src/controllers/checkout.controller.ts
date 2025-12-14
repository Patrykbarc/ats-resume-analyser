import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Stripe from 'stripe'
import { getEnvs } from '../lib/getEnv'
import { logger, prisma } from '../server'
import { handleError } from './helper/handleError'

const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } = getEnvs()

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
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
      metadata: { userId }
    })

    logger.info(session)
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
      logger.error('Brak userId w metadanych sesji.')
      return res.status(400).send('Bad Request: Missing userId in metadata')
    }

    const userId = session.metadata.userId

    try {
      const updatedUser = await prisma.user.update({
        data: { isPremium: true },
        where: { id: userId }
      })

      if (!updatedUser) {
        logger.error(`Użytkownik o ID ${userId} nie został znaleziony.`)
        return res.status(404).send('User not found')
      }

      logger.info(`Płatność zakończona dla użytkownika ${userId}`)
    } catch (error) {
      logger.error(`Błąd podczas aktualizacji użytkownika ${userId}: ${error}`)
      return res.status(500).send('Internal Server Error')
    }
  }

  res.status(200).send('Webhook received')
}
