import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { Button, buttonVariants } from '../ui/button'

const NAV_LINKS = [
  {
    href: '/pricing',
    label: 'Pricing',
    className: cn('text-primary', buttonVariants({ variant: 'default' }))
  },
  { href: '/login', label: 'Log In' },
  { href: '/register', label: 'Sign Up' }
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg text-foreground transition-colors duration-200"
            aria-label="Resume Analyzer Home"
          >
            <div className="size-8 bg-primary dark:bg-primary-foreground rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">RA</span>
            </div>
            <span className="hidden sm:inline">Resume Analyzer</span>
          </Link>

          <NavItems />

          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="ghost"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-200"
          >
            {isOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </Button>
        </div>

        <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </nav>
  )
}

function NavItems() {
  return (
    <div className="hidden md:flex text-neutral-600 font-medium items-center gap-4">
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

function MobileNav({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div
      id="mobile-menu"
      className={cn(
        'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
        isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
      )}
    >
      <div className="px-2 pt-2 pb-3 space-y-1 border-t">
        {NAV_LINKS.map((link) => {
          return (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="block w-full"
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
