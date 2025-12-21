import { Link } from '@tanstack/react-router'

import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { SessionState, useSessionStore } from '@/stores/session/useSessionStore'

type NavLinks = {
  href: string
  label: string
  className?: string
}

type GetNavLinksProps = {
  isUserLoggedIn: SessionState['isUserLoggedIn']
  isPremium: SessionState['isPremium']
}

const getNavLinks = ({ isUserLoggedIn, isPremium }: GetNavLinksProps) => {
  const pricingLink: NavLinks = {
    href: '/pricing',
    label: 'Pricing',
    className: cn('text-primary', buttonVariants({ variant: 'default' }))
  }

  const accountLink: NavLinks = {
    href: '/account',
    label: 'Account'
  }

  const authLinks: NavLinks[] = [
    { href: '/login', label: 'Log In' },
    { href: '/register', label: 'Sign Up' }
  ]

  const baseLink = isPremium ? accountLink : pricingLink

  if (isUserLoggedIn) {
    return [baseLink, { href: '/logout', label: 'Logout' }]
  }

  return [pricingLink, ...authLinks]
}

export function NavItems({ className }: { className?: string }) {
  const { isLoading, isUserLoggedIn, isPremium } = useSessionStore()
  const navLinks = getNavLinks({ isUserLoggedIn, isPremium })

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
