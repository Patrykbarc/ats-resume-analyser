import Logo from '@/components/icons/Logo.svg?react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { lazy, useState } from 'react'
import { Button } from '../../ui/button'

const MobileNav = lazy(() =>
  import('./components/mobile-nav').then((mod) => ({ default: mod.MobileNav }))
)

const NavItems = lazy(() =>
  import('./components/nav-items').then((mod) => ({ default: mod.NavItems }))
)

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/75">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 font-bold text-lg"
          >
            <div className="flex items-center justify-center"></div>
            <Logo className="size-8" />
            <span>Resume Analyzer</span>
          </Link>

          {!isMobile && (
            <NavItems className="hidden md:flex items-center gap-4" />
          )}

          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="outline"
            className="md:hidden p-2 rounded-md"
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>

        {isMobile && <MobileNav isOpen={isOpen} />}
      </div>
    </nav>
  )
}
