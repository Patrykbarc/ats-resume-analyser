import type { PremiumModules } from '@monorepo/types'

import { ListBlock } from './list-block'
import { PremiumCard } from './premium-card'

type SalaryInsightsModuleProps = {
  data: PremiumModules['salary_insights']
}

export function SalaryInsightsModule({ data }: SalaryInsightsModuleProps) {
  const { range_estimate, negotiation_moves, risk_flags } = data

  return (
    <PremiumCard
      title="Salary Negotiation"
      description="Market positioning, levers to negotiate, and risk mitigations."
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">
            Range estimate
          </p>
          <p className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
            {range_estimate}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <ListBlock title="Negotiation moves" items={negotiation_moves} />
          <ListBlock title="Risk flags" items={risk_flags} />
        </div>
      </div>
    </PremiumCard>
  )
}
