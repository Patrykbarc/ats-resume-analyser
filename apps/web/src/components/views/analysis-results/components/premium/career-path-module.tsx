import type { PremiumModules } from '@monorepo/types'

import { ListBlock } from './list-block'
import { PremiumCard } from './premium-card'

type CareerPathModuleProps = {
  data: PremiumModules['career_path']
}

export function CareerPathModule({ data }: CareerPathModuleProps) {
  const { short_term_roles, mid_term_roles, long_term_roles, next_steps } = data

  return (
    <PremiumCard
      title="Career Path"
      description="Progression options with concrete next steps."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <ListBlock title="Short-term roles" items={short_term_roles} />
        <ListBlock title="Mid-term roles" items={mid_term_roles} />
        <ListBlock title="Long-term roles" items={long_term_roles} />
        <ListBlock title="Next steps" items={next_steps} />
      </div>
    </PremiumCard>
  )
}
