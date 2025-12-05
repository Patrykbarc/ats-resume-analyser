import { cn } from '@/lib/utils'
import { NavItems } from './nav-items'

export function MobileNav({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className={cn(
        'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
        isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
      )}
    >
      <div className="py-3 border-t">
        <NavItems className="flex flex-col md:hidden gap-2" />
      </div>
    </div>
  )
}
