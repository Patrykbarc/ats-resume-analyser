import { Button, buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { AnalysisHistoryResponse } from '@/services/analyseService'
import { Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { Clock, FileText, Trash2 } from 'lucide-react'

type AnalysisHistoryProps = {
  history: AnalysisHistoryResponse
  // onDelete: (id: string) => void
  // onLoad: (record: AnalysisRecord) => void
}

export function AnalysisHistory({ history }: AnalysisHistoryProps) {
  return (
    <Card className="border-border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        Analysis History
      </h3>
      <div className="space-y-3">
        {history.logs.map((record) => (
          <div
            key={record.analyseId}
            className="flex items-center justify-between rounded-lg border border-border bg-secondary p-4 transition-colors hover:bg-secondary/80"
          >
            <div className="flex flex-1 items-center gap-3">
              <FileText className="mt-1 h-5 w-5 text-accent" />
              <div className="min-w-0 flex-1">
                {record.fileName && (
                  <Link
                    to="/analyse/$id"
                    params={{ id: record.analyseId }}
                    className="truncate font-medium text-foreground"
                  >
                    {record.fileName}
                  </Link>
                )}

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="size-3.5" />
                  {format(new Date(record.createdAt), 'PPpp')}
                </div>
              </div>
            </div>
            <div className="ml-4 flex gap-2">
              <Link
                to="/analyse/$id"
                params={{ id: record.analyseId }}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' }),
                  'text-xs'
                )}
                // onClick={() => onLoad(record)}
              >
                View
              </Link>
              <Button
                // onClick={() => onDelete(record.id)}
                variant="outline"
                size="sm"
                className="text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
