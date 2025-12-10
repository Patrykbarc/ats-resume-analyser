import { AdSense } from '@/components/ui/adsense'
import { Devtools } from '@/components/views/devtools'
import { Navigation } from '@/components/views/navigation/navigation'
import { NotFound } from '@/components/views/not-found'
import { useAuth } from '@/hooks/useAuth'
import { getEnvs } from '@/lib/getEnv'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'react-hot-toast'
import '../index.css'

const RootLayout = () => {
  const { VITE_NODE_ENV } = getEnvs()
  useAuth()

  return (
    <>
      {VITE_NODE_ENV !== 'development' && <Analytics />}
      <Toaster />

      <div className="bg-background min-h-dvh flex flex-col">
        <Navigation />
        <main className="flex-1 py-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Outlet />
            <Devtools />
          </div>
        </main>

        <footer>
          <AdSense adSlot="9101349995" />
        </footer>
      </div>
    </>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound
})
