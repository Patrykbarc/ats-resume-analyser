import { Resend } from 'resend'
import { getEnvs } from '../lib/getEnv'

const { RESEND_API_KEY } = getEnvs()

const resend = new Resend(RESEND_API_KEY)

export { resend }
