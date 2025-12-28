import { User } from '@monorepo/database'

type NextBillingDate = string | null
type UserBillingInformation = {
  id: User['id']
  nextBillingDate: NextBillingDate
  subscriptionStatus?: User['subscriptionStatus']
  className?: string
}

export type { NextBillingDate, UserBillingInformation }
