import { UserSchemaType } from '@monorepo/schemas'
import { create } from 'zustand'

export type SessionState = {
  user: UserSchemaType | null
  setUser: (user: UserSchemaType | null) => void
  authToken: string | null
  setAuthToken: (token: string | null) => void
  isUserLoggedIn: boolean
  setIsUserLoggedIn: (loggedIn: boolean) => void
  isPremium: boolean
  setIsPremium: (premium: boolean) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const state = {
  user: null,
  authToken: sessionStorage.getItem('jwtToken'),
  isUserLoggedIn: false,
  isPremium: false,
  isLoading: false
} as const

export const useSessionState = create(
  (set): SessionState => ({
    ...state,

    setUser: (user) => set({ user }),
    setAuthToken: (token) => {
      if (token) {
        sessionStorage.setItem('jwtToken', token)
      } else {
        sessionStorage.removeItem('jwtToken')
      }
      set({ authToken: token, user: null })
    },
    setIsUserLoggedIn: (loggedIn) => set({ isUserLoggedIn: loggedIn }),
    setIsPremium: (premium) => set({ isPremium: premium }),
    setIsLoading: (loading) => set({ isLoading: loading })
  })
)
