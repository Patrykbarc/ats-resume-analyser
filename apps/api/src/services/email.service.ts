import { StatusCodes } from 'http-status-codes'
import { transporter } from '../config/nodemailer.config'
import { getEnvs } from '../lib/getEnv'
import { logger } from '../server'

const { NODE_ENV, SMTP_USER } = getEnvs()

export const sendRegisterConfirmationEmail = async ({
  reciever
}: {
  reciever: string
}) => {
  const message = {
    from: SMTP_USER,
    to: reciever,
    subject: 'Message title',
    text: 'Plaintext version of the message',
    html: '<p>HTML version of the message</p>'
  }

  await transporter.verify()

  if (NODE_ENV === 'development') {
    logger.info('Server is ready to take our messages')
  }

  transporter.sendMail(message, (err) => {
    if (err) {
      logger.error(err)
      return { status: StatusCodes.BAD_REQUEST }
    }
  })

  return { status: StatusCodes.OK }
}
