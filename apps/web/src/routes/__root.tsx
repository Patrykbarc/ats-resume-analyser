import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import '../index.css'

const RootLayout = () => (
  <>
    <Outlet />
    <TanStackRouterDevtools />
    <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
  </>
)

export const Route = createRootRoute({ component: RootLayout })
