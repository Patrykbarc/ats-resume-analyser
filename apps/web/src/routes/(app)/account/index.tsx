import { AccountInformationCard } from '@/components/views/account/account-information-card'
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
  // TODO: add loading skeletons
  pendingComponent: () => <div>Loading account...</div>
})

function RouteComponent() {
  const data = useLoaderData({ from: '/(app)/account/' })

  return (
    <div className="space-y-6">
      <AccountInformationCard createdAt={data.createdAt} email={data.email} />
      <SubscriptionDetailsCard
        id={data.id}
        subscriptionCurrentPeriodEnd={data.subscriptionCurrentPeriodEnd}
        subscriptionStatus={data.subscriptionStatus}
      />
    </div>
  )
}
