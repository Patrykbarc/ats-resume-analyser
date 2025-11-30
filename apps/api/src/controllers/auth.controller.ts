import * as bcrypt from 'bcryptjs'
import type { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { getEnvs } from '../lib/getEnv'
import { logger, prisma } from '../server'
import { sendRegisterConfirmationEmail } from '../services/email.service'
import { createNewUser } from './helper/auth/createNewUser'
import { verifyIsTokenExpired } from './helper/auth/verifyIsTokenExpired'
import { handleError } from './helper/handleError'

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const { JWT_SECRET } = getEnvs()

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Invalid credentials.'
      })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Invalid credentials.' })
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '1h'
    })

    res.status(StatusCodes.OK).json({
      user_id: user.id,
      token: token
    })
  } catch (error) {
    handleError(error, res)
  }
}

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: 'User already exists.' })
    }

    const { user, confirmationToken } = await createNewUser({ email, password })

    await sendRegisterConfirmationEmail({ reciever: email, confirmationToken })

    res.status(StatusCodes.CREATED).json({
      user_id: user.id,
      message: 'User created successfully.'
    })
  } catch (error) {
    handleError(error, res)
  }
}

export const verifyUser = async (req: Request, res: Response) => {
  const { token } = req.body

  try {
    const userRecord = await prisma.user.findUnique({
      where: {
        confirmationToken: token
      },
      select: {
        id: true,
        confirmationTokenExpiry: true
      }
    })

    if (!userRecord) {
      logger.warn(`Attempt to verify with an unknown token.`)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Verification token not found.' })
    }

    const isExpired = verifyIsTokenExpired(userRecord.confirmationTokenExpiry)

    if (isExpired) {
      logger.warn(`The token for user ${userRecord.id} has expired.`)

      return res
        .status(StatusCodes.GONE)
        .json({ message: 'Verification token has expired.' })
    }

    await prisma.user.update({
      where: {
        id: userRecord.id
      },
      data: {
        confirmationToken: null,
        confirmationTokenExpiry: null
      }
    })

    logger.info(`User ${userRecord.id} successfully verified.`)
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Account successfully verified.' })
  } catch (error) {
    handleError(error, res)
  }
}
