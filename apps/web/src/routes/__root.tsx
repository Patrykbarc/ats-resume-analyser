import { Devtools } from '@/components/views/devtools'
import { Navigation } from '@/components/views/navigation/navigation'
import { NotFound } from '@/components/views/not-found'
import { useAuth } from '@/hooks/useAuth'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Toaster } from 'react-hot-toast'
import '../index.css'

const RootLayout = () => {
  useAuth()

  return (
    <>
      <Toaster />

      <div className="bg-background min-h-dvh flex flex-col">
        <Navigation />
        <main className="flex-1 py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Outlet />
            <Devtools />
          </div>
        </main>
      </div>
    </>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound
})
