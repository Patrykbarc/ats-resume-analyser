import { Link } from '@tanstack/react-router'

import { buttonVariants } from '@/components/ui/button'
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
  const { isUserLoggedIn } = useSessionState()
  const navLinks = getNavLinks(isUserLoggedIn)

  return (
    <div className={cn('text-neutral-600 font-medium', className)}>
      {navLinks.map((link) => {
        return (
          <Link key={link.href} to={link.href} className={link.className}>
            {link.label}
          </Link>
        )
      })}
    </div>
  )
}
