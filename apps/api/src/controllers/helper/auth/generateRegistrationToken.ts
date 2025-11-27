import crypto from 'node:crypto'

const BYTES = 32

export const generateRegistrationToken = () => {
  const tokenBuffer = crypto.randomBytes(BYTES)

  return tokenBuffer.toString('hex')
}
