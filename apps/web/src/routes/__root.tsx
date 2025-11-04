import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import '../index.css'

const RootLayout = () => (
  <>
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
        <TanStackRouterDevtools />
        <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
      </div>
    </main>
  </>
)

export const Route = createRootRoute({ component: RootLayout })
