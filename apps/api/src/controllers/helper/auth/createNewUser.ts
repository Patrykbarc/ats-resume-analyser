import bcrypt from 'bcryptjs'
import { prisma } from '../../../server'
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
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
  const confirmationToken = generateRegistrationToken()
  const confirmationTokenExpiry = getConfirmationTokenExpiry()

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      confirmationToken,
      confirmationTokenExpiry
    },
    select: { email: true }
  })

  return { user, confirmationToken }
}
