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
