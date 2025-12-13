import bcrypt from 'bcryptjs'
import { logger, prisma } from '../../../server'
import { generateRegistrationToken } from './generateRegistrationToken'
import { getConfirmationTokenExpiry } from './getConfirmationTokenExpiry'

const SALT_ROUNDS = 10

export const createNewUser = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  try {
    logger.info(`Creating new user for email: ${email}`)

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const confirmationToken = generateRegistrationToken()
    const confirmationTokenExpiry = getConfirmationTokenExpiry()

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        confirmationToken,
        confirmationTokenExpiry
      },
      select: { email: true }
    })

    logger.info(`User created successfully: ${email}`)
    return { user, confirmationToken }
  } catch (err) {
    logger.error(`Failed to create user: ${err}`)
    throw err
  }
}
