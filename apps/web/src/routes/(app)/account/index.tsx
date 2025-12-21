import { AccountInformationCard } from '@/components/views/account/account-information-card'
import { AccountInformationCardSkeleton } from '@/components/views/account/components/skeletons/account-information-card-skeleton'
import { SubscriptionDetailsCardSkeleton } from '@/components/views/account/components/skeletons/subscription-details-card-skeleton'
import { SubscriptionDetailsCard } from '@/components/views/account/subscription-details-card'
import { QUERY_KEYS } from '@/constants/queryKeys'
import {
  getCurrentUserService,
  getUserAccountInformationsService
} from '@/services/authService'
import {
  createFileRoute,
  redirect,
  useLoaderData
} from '@tanstack/react-router'
import { format } from 'date-fns'

export const Route = createFileRoute('/(app)/account/')({
  beforeLoad: async ({ context: { queryClient } }) => {
    const response = await queryClient.ensureQueryData({
      queryKey: QUERY_KEYS.session.currentUser,
      queryFn: getCurrentUserService
    })

    if (!response?.id) {
      throw redirect({ to: '/login' })
    }
  },
  loader: async ({ context: { queryClient } }) => {
    return await queryClient.ensureQueryData({
      queryKey: QUERY_KEYS.session.account,
      queryFn: getUserAccountInformationsService
    })
  },
  component: RouteComponent,
  pendingComponent: LoadingComponent
})

function RouteComponent() {
  const data = useLoaderData({ from: '/(app)/account/' })

  const nextBillingDate =
    data.subscriptionCurrentPeriodEnd &&
    format(data.subscriptionCurrentPeriodEnd, 'MMMM dd, yyyy')

  return (
    <div className="space-y-6">
      <AccountInformationCard createdAt={data.createdAt} email={data.email} />
      <SubscriptionDetailsCard
        id={data.id}
        nextBillingDate={nextBillingDate}
        subscriptionStatus={data.subscriptionStatus}
      />
    </div>
  )
}

function LoadingComponent() {
  return (
    <div className="space-y-6">
      <AccountInformationCardSkeleton />
      <SubscriptionDetailsCardSkeleton />
    </div>
  )
}
