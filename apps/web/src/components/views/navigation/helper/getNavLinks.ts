import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SessionState } from '@/stores/session/useSessionStore'

type NavLinks = {
  href: string
  label: string
  className?: string
}

type GetNavLinksProps = {
  isUserLoggedIn: SessionState['isUserLoggedIn']
  isPremium: SessionState['isPremium']
  highlightCta?: boolean
}

export const getNavLinks = ({
  isUserLoggedIn,
  isPremium,
  highlightCta
}: GetNavLinksProps) => {
  const pricingLink: NavLinks = {
    href: '/pricing',
    label: 'Pricing',
    className: highlightCta
      ? cn('text-primary', buttonVariants({ variant: 'default' }))
      : undefined
  }

  const accountLink: NavLinks = { href: '/account', label: 'Account' }

  const authLinks: NavLinks[] = [
    { href: '/login', label: 'Log In' },
    { href: '/register', label: 'Sign Up' }
  ]

  const pricingOptionLink = !isPremium && pricingLink

  if (isUserLoggedIn) {
    return [
      pricingOptionLink,
      accountLink,
      { href: '/logout', label: 'Logout' }
    ]
  }

  return [pricingLink, ...authLinks]
}
