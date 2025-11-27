import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { transporter } from '../config/nodemailer.config'
import { getEnvs } from '../lib/getEnv'
import { logger } from '../server'

const { NODE_ENV, SMTP_USER, FRONTEND_URL } = getEnvs()

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
  const confirmationAddress = `${FRONTEND_URL}/verify?t=${confirmationToken}`
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
    from: SMTP_USER,
    to: reciever,
    subject: 'Welcome to ATS Resume Analyzer',
    text: `Click the verification link we've sent to confirm your email address.`,
    html: template
  }

  if (NODE_ENV === 'development') {
    await transporter.verify()
    logger.info('Server is ready to take our messages')
  }

  transporter.sendMail(message, (err) => {
    if (err) {
      logger.error(err)
    }
  })
}
