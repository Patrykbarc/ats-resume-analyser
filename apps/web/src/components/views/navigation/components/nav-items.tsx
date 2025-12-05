import { Link } from '@tanstack/react-router'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const NAV_LINKS = [
  {
    href: '/pricing',
    label: 'Pricing',
    className: cn('text-primary', buttonVariants({ variant: 'default' }))
  },
  { href: '/login', label: 'Log In' },
  { href: '/register', label: 'Sign Up' }
]

export function NavItems({ className }: { className?: string }) {
  return (
    <div className={cn('text-neutral-600 font-medium', className)}>
      {NAV_LINKS.map((link) => {
        return (
          <Link key={link.href} to={link.href} className={link.className}>
            {link.label}
          </Link>
        )
      })}
    </div>
  )
}
