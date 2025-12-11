import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { resend } from '../config/email.config'
import { getEnvs } from '../lib/getEnv'
import { logger } from '../server'

const { FRONTEND_URL, EMAIL_SENDER } = getEnvs()

const getEmailHtmlTemplate = ({
  confirmationToken
}: {
  confirmationToken: string
}) => {
  try {
    const dirname = path.dirname(fileURLToPath(import.meta.url))
    const templatePath = path.join(dirname, 'templates', 'email.template.html')
    const htmlTemplate = readFileSync(templatePath, 'utf-8')
    logger.info(`Email template loaded from: ${templatePath}`)

    const confirmationAddress = `${FRONTEND_URL}/verify/${confirmationToken}`
    const currentYear = new Date().getFullYear()

    let finalHtml = htmlTemplate

    finalHtml = finalHtml.replace(
      /\$\{confirmationAddress\}/g,
      confirmationAddress
    )
    finalHtml = finalHtml.replace(/\$\{currentYear\}/g, String(currentYear))

    return finalHtml
  } catch (err) {
    logger.error(`Failed to load email template: ${err}`)
    throw err
  }
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

    const template = getEmailHtmlTemplate({ confirmationToken })
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
