import type { PremiumModules } from '@monorepo/types'

import { ListBlock } from './list-block'
import { PremiumCard } from './premium-card'

type AtsKeywordModuleProps = {
  data: PremiumModules['ats_keyword_match']
}

export function AtsKeywordModule({ data }: AtsKeywordModuleProps) {
  const { target_role, matched_keywords, missing_keywords, optimization_tips } =
    data

  return (
    <PremiumCard
      title="ATS Keyword Match"
      description="Keyword coverage and missing terms that influence ATS filters."
    >
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Target role focus:{' '}
          <span className="font-semibold text-foreground">
            {target_role || 'Not detected'}
          </span>
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <ListBlock title="Matched keywords" items={matched_keywords} />
          <ListBlock title="Missing keywords" items={missing_keywords} />
        </div>
        <ListBlock title="Optimization tips" items={optimization_tips} />
      </div>
    </PremiumCard>
  )
}
