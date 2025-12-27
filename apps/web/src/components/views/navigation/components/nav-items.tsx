import { Link } from '@tanstack/react-router'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useSessionStore } from '@/stores/session/useSessionStore'
import { getNavLinks } from '../helper/getNavLinks'

export function NavItems({
  className,
  highlightCta
}: {
  className?: string
  highlightCta?: boolean
}) {
  const { isLoading, isUserLoggedIn, isPremium } = useSessionStore()
  const navLinks = getNavLinks({ isUserLoggedIn, isPremium, highlightCta })

  if (isLoading) {
    return <NavItemsSkeleton />
  }

  return (
    <>
      <ul className={cn('text-neutral-600 font-medium', className)}>
        {navLinks.map((link) => {
          return (
            <li key={link.href}>
              <Link to={link.href} className={link.className}>
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
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
