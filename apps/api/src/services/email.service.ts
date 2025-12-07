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
  const filename = fileURLToPath(import.meta.url)
  const dirname = path.dirname(filename)

  const templatePath = path.join(
    dirname,
    '../src/templates/email.template.html'
  )
  const confirmationAddress = `${FRONTEND_URL}/verify/${confirmationToken}`
  const currentYear = new Date().getFullYear()
  const htmlTemplate = readFileSync(templatePath, 'utf-8')

  let finalHtml = htmlTemplate

  finalHtml = finalHtml.replace(
    /\$\{confirmationAddress\}/g,
    confirmationAddress
  )
  finalHtml = finalHtml.replace(/\$\{currentYear\}/g, String(currentYear))

  return finalHtml
}

export const sendRegisterConfirmationEmail = async ({
  reciever,
  confirmationToken
}: {
  reciever: string
  confirmationToken: string
}) => {
  const template = getEmailHtmlTemplate({ confirmationToken })

  const message = {
    from: EMAIL_SENDER,
    to: reciever,
    subject: 'Welcome to ATS Resume Analyzer',
    text: `Click the verification link we've sent to confirm your email address.`,
    html: template
  }

  resend.emails
    .send(message)
    .then(() => {
      logger.info('Email sent successfully')
    })
    .catch((err) => {
      logger.error('Error sending email:', err)
    })
}
