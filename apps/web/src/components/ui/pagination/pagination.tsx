import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNav,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination/components/pagination-components'
import { cn } from '@/lib/utils'
import { parseAsInteger, useQueryState } from 'nuqs'
import { usePagination } from './hooks/usePagination'

export function Pagination({ totalPages }: { totalPages: number }) {
  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  )
  const { items } = usePagination({ currentPage, totalPages })

  return (
    <PaginationNav>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            className={cn(
              currentPage === 1 && 'pointer-events-none opacity-50'
            )}
          />
        </PaginationItem>

        {items.map((item, index) => (
          <PaginationItem key={`${item}-${index}`}>
            {item === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => setCurrentPage(Number(item))}
                isActive={Number(item) === currentPage}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            className={cn(
              currentPage === totalPages && 'pointer-events-none opacity-50'
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationNav>
  )
}
