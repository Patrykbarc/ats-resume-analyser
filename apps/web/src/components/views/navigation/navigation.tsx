import Logo from '@/components/icons/Logo.svg?react'
import { useSessionState } from '@/stores/session/useSessionState'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../ui/button'
import { MobileNav } from './components/mobile-nav'
import { NavItems } from './components/nav-items'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { isPremium } = useSessionState()

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

          <p className="font-strong">
            {isPremium ? 'Premium User' : 'Free User'}
          </p>

          <NavItems className="hidden md:flex items-center gap-4" />

          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="outline"
            className="md:hidden p-2 rounded-md"
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>

        <MobileNav isOpen={isOpen} />
      </div>
    </nav>
  )
}
