import type { PremiumModules } from '@monorepo/types'

import { ListBlock } from './list-block'
import { PremiumCard } from './premium-card'

type ContentStructureModuleProps = {
  data: PremiumModules['content_and_structure']
}

export function ContentStructureModule({ data }: ContentStructureModuleProps) {
  const { format_issues, structure_recommendations, content_gaps } = data

  return (
    <PremiumCard
      title="Content & Structure"
      description="Layout, ordering, and content fixes to keep ATS parsers happy."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <ListBlock title="Format issues" items={format_issues} />
        <ListBlock
          title="Structure recommendations"
          items={structure_recommendations}
        />
      </div>
      <ListBlock title="Content gaps" items={content_gaps} />
    </PremiumCard>
  )
}
