import { HISTORY_PAGE_LIMIT } from '@/constants/history-pagination-limits'
import { useGetAnalysisHistory } from '@/hooks/useGetAnalysisHistory'
import { HistoryLogs } from '@/hooks/useGetAnalysisHistory/types/types'
import { useSessionStore } from '@/stores/session/useSessionStore'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { format } from 'date-fns'
import { useMemo } from 'react'

export function AnalysisHistory() {
  const { user } = useSessionStore()
  const { data: history } = useGetAnalysisHistory({
    id: user?.id ?? '',
    limit: HISTORY_PAGE_LIMIT,
    page: 1,
    keyType: 'historyPage'
  })

  const historyLogs: HistoryLogs[] = history?.data.logs ?? []

  const columns: ColumnDef<HistoryLogs>[] = useMemo(
    () => [
      {
        header: 'File Name',
        accessorKey: 'fileName'
      },
      {
        header: 'File Size (bytes)',
        accessorKey: 'fileSize'
      },
      {
        header: 'Analyzed At',
        accessorFn: (row) => format(new Date(row.createdAt), 'PPpp')
      }
    ],
    []
  )

  const table = useReactTable({
    data: historyLogs,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="p-6">
      <div className="rounded-lg border">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-sm font-medium"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b hover:bg-muted/30 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-sm text-muted-foreground"
                >
                  No analysis history found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
