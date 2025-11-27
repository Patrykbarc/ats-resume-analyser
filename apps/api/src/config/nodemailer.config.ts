import nodemailer, { TransportOptions } from 'nodemailer'
import { getEnvs } from '../lib/getEnv'

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = getEnvs()

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: +SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
} as TransportOptions)

export { transporter }
