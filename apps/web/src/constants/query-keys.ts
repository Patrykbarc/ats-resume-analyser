export const QUERY_KEYS = {
  session: {
    currentUser: ['currentUser'] as const,
    account: ['accountInformations'] as const
  },
  subscription: {
    user: ['userSubscription'] as const
  },
  stripe: {
    session: (sessionId: string) => ['stripeSession', sessionId] as const
  },
  analysis: {
    byId: (id: string) => ['analysis', id] as const,
    history: (userId: string) => ['analysisHistory', userId] as const
  }
}
