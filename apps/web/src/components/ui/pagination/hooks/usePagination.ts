export const usePagination = ({
  totalPages,
  currentPage
}: {
  totalPages: number
  currentPage: number
}) => {
  const items: (number | string)[] = []
  const maxVisible = 5

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      items.push(i)
    }
  } else {
    items.push(1)

    if (currentPage > 3) {
      items.push('...')
    }

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      if (!items.includes(i)) {
        items.push(i)
      }
    }

    if (currentPage < totalPages - 2) {
      items.push('...')
    }

    items.push(totalPages)
  }

  return { items }
}
