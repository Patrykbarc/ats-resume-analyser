import { Devtools } from '@/components/views/devtools'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Toaster } from 'react-hot-toast'
import '../index.css'

const RootLayout = () => (
  <>
    <Toaster />

    <main className="bg-background py-12">
      <div className="mx-auto min-h-dvh max-w-5xl px-4 sm:px-6 lg:px-8">
        <Outlet />
        <Devtools />
      </div>
    </main>
  </>
)

export const Route = createRootRoute({ component: RootLayout })
