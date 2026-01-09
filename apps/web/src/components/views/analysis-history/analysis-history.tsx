import { Pagination } from '@/components/ui/pagination/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { HISTORY_PAGE_LIMIT } from '@/constants/history-pagination-limits'
import { useGetAnalysisHistory } from '@/hooks/useGetAnalysisHistory'
import { HistoryLogs } from '@/hooks/useGetAnalysisHistory/types/types'
import { useSessionStore } from '@/stores/session/useSessionStore'
import { Link } from '@tanstack/react-router'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { format } from 'date-fns'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useMemo } from 'react'

export function AnalysisHistory() {
  const { user } = useSessionStore()
  const [currentPage] = useQueryState('page', parseAsInteger.withDefault(1))

  const { data: history, isLoading } = useGetAnalysisHistory({
    id: user?.id ?? '',
    limit: HISTORY_PAGE_LIMIT,
    page: currentPage,
    keyType: 'historyPage'
  })

  const historyLogs: HistoryLogs[] = history?.data.logs ?? []
  const pagination = history?.data.pagination

  const columns: ColumnDef<HistoryLogs>[] = useMemo(
    () => [
      {
        header: 'File Name',
        accessorKey: 'fileName',
        cell: (info) => (
          <Link
            to="/analyse/$id"
            params={{ id: info.row.original.analyseId }}
            className="hover:underline underline-offset-2"
          >
            {info.row.original.fileName}
          </Link>
        )
      },
      {
        header: 'File Size (bytes)',
        accessorKey: 'fileSize'
      },
      {
        header: 'Analyzed At',
        accessorKey: 'createdAt',
        cell: (info) => format(new Date(info.getValue() as string), 'PPpp')
      }
    ],
    []
  )

  const table = useReactTable({
    data: historyLogs,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const totalPages = pagination?.totalPages ?? 1

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <Table className="table-fixed w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="max-w-[250px]" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {isLoading ? (
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {columns.map((_, cellIndex) => (
                    <TableCell key={`skeleton-cell-${cellIndex}`}>
                      <Skeleton className="h-[20px] w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className="max-w-[250px]" key={cell.id}>
                        <div className="truncate">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    No analysis history found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>

      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  )
}
