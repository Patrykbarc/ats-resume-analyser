import { isPast } from 'date-fns'

export const verifyIsTokenExpired = (expiryDate: Date | null): boolean => {
  if (!expiryDate) {
    return true
  }

  return isPast(expiryDate)
}
