import type { PremiumModules } from '@monorepo/types'

import { ListBlock } from './list-block'
import { PremiumCard } from './premium-card'

type ExportModuleProps = {
  data: PremiumModules['export']
}

export function ExportModule({ data }: ExportModuleProps) {
  const { pdf_outline, priority_order, notes } = data

  return (
    <PremiumCard
      title="Export to PDF"
      description="Ordered export plan so reports stay reader-friendly after download."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <ListBlock title="PDF outline" items={pdf_outline} />
        <ListBlock title="Priority order" items={priority_order} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-semibold text-foreground">Notes</p>
        <p className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
          {notes}
        </p>
      </div>
    </PremiumCard>
  )
}
