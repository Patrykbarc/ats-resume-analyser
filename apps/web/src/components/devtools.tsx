import { getEnv } from '@/lib/getEnv'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Devtools = () => {
  const env = getEnv()

  if (env.NODE_ENV === 'production') {
    return
  }

  return (
    <>
      <TanStackRouterDevtools />
      <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
    </>
  )
}
