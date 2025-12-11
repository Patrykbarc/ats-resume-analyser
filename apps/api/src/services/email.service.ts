import { resend } from '../config/email.config'
import { getEnvs } from '../lib/getEnv'
import { logger } from '../server'
import { getHtmlTemplate } from './helper/getHtmlTemplate'

const { FRONTEND_URL, EMAIL_SENDER } = getEnvs()

const getActivateAccountHtmlTemplate = ({
  confirmationToken
}: {
  confirmationToken: string
}) => {
  const confirmationAddress = `${FRONTEND_URL}/verify/${confirmationToken}`
  const currentYear = new Date().getFullYear()
  return getHtmlTemplate('activate-account.template.html', {
    confirmationAddress,
    currentYear
  })
}

const getPasswordResetEmailTemplate = ({
  resetToken
}: {
  resetToken: string
}) => {
  const resetAddress = `${FRONTEND_URL}/reset-password/${resetToken}`
  const currentYear = new Date().getFullYear()
  return getHtmlTemplate('password-reset.template.html', {
    resetAddress,
    currentYear
  })
}

export const sendRegisterConfirmationEmail = async ({
  reciever,
  confirmationToken
}: {
  reciever: string
  confirmationToken: string
}) => {
  try {
    logger.info(`Starting email sending for: ${reciever}`)

    const template = getActivateAccountHtmlTemplate({ confirmationToken })
    logger.info(`Email template loaded successfully`)

    const message = {
      from: EMAIL_SENDER,
      to: reciever,
      subject: 'Welcome to ATS Resume Analyzer',
      text: `Click the verification link we've sent to confirm your email address.`,
      html: template
    }

    logger.info(`Sending email via Resend API...`)
    const response = await resend.emails.send(message)
    logger.info(`Email sent successfully`)

    return response
  } catch (err) {
    logger.error(`Error sending email to ${reciever}: ${err}`)
    throw err
  }
}

export const sendPasswordResetEmail = async ({
  reciever,
  resetToken
}: {
  reciever: string
  resetToken: string
}) => {
  try {
    logger.info(`Starting password reset email sending for: ${reciever}`)

    const template = getPasswordResetEmailTemplate({ resetToken })
    logger.info(`Password reset email template loaded successfully`)

    const message = {
      from: EMAIL_SENDER,
      to: reciever,
      subject: 'Reset Your Password - ATS Resume Analyzer',
      text: `Click the link to reset your password. This link will expire in 24 hours.`,
      html: template
    }

    logger.info(`Sending password reset email via Resend API...`)
    const response = await resend.emails.send(message)
    logger.info(`Password reset email sent successfully`)

    return response
  } catch (err) {
    logger.error(`Error sending password reset email to ${reciever}: ${err}`)
    throw err
  }
}
