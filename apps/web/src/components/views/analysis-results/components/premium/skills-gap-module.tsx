import type { PremiumModules } from '@monorepo/types'

import { ListBlock } from './list-block'
import { PremiumCard } from './premium-card'

type SkillsGapModuleProps = {
  data: PremiumModules['skills_gap']
}

export function SkillsGapModule({ data }: SkillsGapModuleProps) {
  const { gaps, learning_plan, certifications } = data

  return (
    <PremiumCard
      title="Skills Gap Analysis"
      description="Capabilities to build plus a focused learning path."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <ListBlock title="Gaps" items={gaps} />
        <ListBlock title="Learning plan" items={learning_plan} />
        <ListBlock title="Certifications" items={certifications} />
      </div>
    </PremiumCard>
  )
}
