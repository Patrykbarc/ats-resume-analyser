import { UserSchemaType } from '@monorepo/schemas'
import { create } from 'zustand'

type AuthState = {
  user: UserSchemaType | null
  setUser: (user: UserSchemaType | null) => void
  authToken: string | null
  setAuthToken: (token: string | null) => void
  isUserLoggedIn: boolean
  setIsUserLoggedIn: (loggedIn: boolean) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const state = {
  user: null,
  authToken: sessionStorage.getItem('jwtToken'),
  isUserLoggedIn: false,
  isLoading: false
} as const

export const useSessionState = create(
  (set): AuthState => ({
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
    setIsLoading: (loading) => set({ isLoading: loading })
  })
)
