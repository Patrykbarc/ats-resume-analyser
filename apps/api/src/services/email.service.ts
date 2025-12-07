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
    const filename = fileURLToPath(import.meta.url)
    const dirname = path.dirname(filename)

    const possiblePaths = [
      path.join(dirname, '../templates/email.template.html'),
      path.join(dirname, '../src/templates/email.template.html'),
      path.resolve(dirname, '../../templates/email.template.html')
    ]

    let templatePath: string | null = null
    let htmlTemplate = ''

    for (const candidatePath of possiblePaths) {
      try {
        htmlTemplate = readFileSync(candidatePath, 'utf-8')
        templatePath = candidatePath
        logger.info(`Email template loaded from: ${candidatePath}`)
        break
      } catch {
        new Error(`Template not found at: ${candidatePath}`)
      }
    }

    if (!templatePath || !htmlTemplate) {
      throw new Error(
        `Could not find email template. Tried paths: ${possiblePaths.join(', ')}`
      )
    }

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
