import { UserSchemaType } from '@monorepo/schemas'
import { isAfter } from 'date-fns'

export const isPremiumUser = (user: UserSchemaType | undefined): boolean => {
  if (!user) {
    return false
  }

  if (!user.isPremium) {
    return false
  }

  if (!user.premiumExpiresAt) {
    return true
  }

  return isAfter(user.premiumExpiresAt, new Date())
}
