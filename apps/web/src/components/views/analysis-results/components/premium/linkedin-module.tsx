import type { PremiumModules } from '@monorepo/types'

import { ListBlock } from './list-block'
import { PremiumCard } from './premium-card'

type LinkedinModuleProps = {
  data: PremiumModules['linkedin_profile']
}

export function LinkedinModule({ data }: LinkedinModuleProps) {
  const { headline, about_summary, featured_keywords, action_items } = data

  return (
    <PremiumCard
      title="LinkedIn Optimization"
      description="Profile positioning, keyword placement, and hygiene actions."
    >
      <div className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">Headline</p>
            <p className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
              {headline}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">
              About summary
            </p>
            <p className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
              {about_summary}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ListBlock title="Featured keywords" items={featured_keywords} />
          <ListBlock title="Action items" items={action_items} />
        </div>
      </div>
    </PremiumCard>
  )
}
