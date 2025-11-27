import * as bcrypt from 'bcryptjs'
import type { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { getEnvs } from '../lib/getEnv'
import { prisma } from '../server'
import { sendRegisterConfirmationEmail } from '../services/email.service'
import { createNewUser } from './helper/auth/createNewUser'
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

    const { user } = await createNewUser({ email, password })

    await sendRegisterConfirmationEmail({ reciever: email })

    res.status(StatusCodes.CREATED).json({
      user_id: user.id,
      message: 'User created successfully.'
    })
  } catch (error) {
    handleError(error, res)
  }
}
