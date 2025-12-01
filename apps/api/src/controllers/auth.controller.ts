import * as bcrypt from 'bcryptjs'
import type { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { getEnvs } from '../lib/getEnv'
import { prisma } from '../server'
import { sendRegisterConfirmationEmail } from '../services/email.service'
import { createNewUser } from './helper/auth/createNewUser'
import { generateRegistrationToken } from './helper/auth/generateRegistrationToken'
import { getConfirmationTokenExpiry } from './helper/auth/getConfirmationTokenExpiry'
import { handleNewJwtTokens } from './helper/auth/handleNewJwtTokens'
import { verifyIsTokenExpired } from './helper/auth/verifyIsTokenExpired'
import { handleError } from './helper/handleError'

import jwt from 'jsonwebtoken'

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

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

    const token = handleNewJwtTokens({ res, userId: user.id })

    res.status(StatusCodes.OK).json({
      token
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

    const { confirmationToken } = await createNewUser({ email, password })

    await sendRegisterConfirmationEmail({ reciever: email, confirmationToken })

    res.status(StatusCodes.CREATED).json({
      message: 'User created successfully.'
    })
  } catch (error) {
    handleError(error, res)
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  const { JWT_REFRESH_SECRET } = getEnvs()
  const refreshToken = req.cookies.jwt_refresh

  if (!refreshToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Refresh token missing.' })
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
      userId: string
    }
    const userId = decoded.userId

    const user = await prisma.user.findUnique({
      where: { id: userId, refreshToken: refreshToken }
    })

    if (!user) {
      res.clearCookie('jwt_refresh')
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Invalid or revoked refresh token. Please log in again.'
      })
    }

    const newAccessToken = await handleNewJwtTokens({ userId, res })

    res.status(StatusCodes.OK).json({
      token: newAccessToken
    })
  } catch (error) {
    handleError(error, res)

    res.clearCookie('jwt_refresh')
    return res.status(StatusCodes.FORBIDDEN).json({
      message: 'Refresh session expired or invalid. Please log in again.'
    })
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
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Verification token not found.' })
    }

    const isExpired = verifyIsTokenExpired(userRecord.confirmationTokenExpiry)

    if (isExpired) {
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

    return res
      .status(StatusCodes.OK)
      .json({ message: 'Account successfully verified.' })
  } catch (error) {
    handleError(error, res)
  }
}

export const resendVerificationLink = async (req: Request, res: Response) => {
  const { token } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: { confirmationToken: token },
      select: { id: true, email: true }
    })

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'User not found'
      })
    }

    const confirmationToken = generateRegistrationToken()
    const confirmationTokenExpiry = getConfirmationTokenExpiry()

    await prisma.user.update({
      where: { id: user.id },
      data: {
        confirmationToken,
        confirmationTokenExpiry
      }
    })

    await sendRegisterConfirmationEmail({
      reciever: user.email,
      confirmationToken
    })

    res.status(StatusCodes.OK).json({
      message: 'A new verification link has been sent.'
    })
  } catch (error) {
    handleError(error, res)
  }
}
