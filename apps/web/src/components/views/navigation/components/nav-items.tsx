import { Link } from '@tanstack/react-router'

import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { SessionState, useSessionState } from '@/stores/session/useSessionState'

type NavLinks = {
  href: string
  label: string
  className?: string
}

const getNavLinks = (isUserLoggedIn: SessionState['isUserLoggedIn']) => {
  const baseLinks: NavLinks = {
    href: '/pricing',
    label: 'Pricing',
    className: cn('text-primary', buttonVariants({ variant: 'default' }))
  }

  const authLinks: NavLinks[] = [
    { href: '/login', label: 'Log In' },
    { href: '/register', label: 'Sign Up' }
  ]

  if (isUserLoggedIn) {
    return [baseLinks, { href: '/logout', label: 'Logout' }]
  }

  return [baseLinks, ...authLinks]
}

export function NavItems({ className }: { className?: string }) {
  const { isLoading, isUserLoggedIn } = useSessionState()
  const navLinks = getNavLinks(isUserLoggedIn)

  if (isLoading) {
    return <NavItemsSkeleton />
  }

  return (
    <>
      <div className={cn('text-neutral-600 font-medium', className)}>
        {navLinks.map((link) => {
          return (
            <Link key={link.href} to={link.href} className={link.className}>
              {link.label}
            </Link>
          )
        })}
      </div>
    </>
  )
}

function NavItemsSkeleton() {
  return (
    <div className="gap-4 items-center hidden md:flex">
      <Skeleton className="h-9 w-20" />
      <Skeleton className="h-6 w-14" />
      <Skeleton className="h-6 w-14" />
    </div>
  )
}
