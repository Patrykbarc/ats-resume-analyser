import type { PremiumModules } from '@monorepo/types'

import { ListBlock } from './list-block'
import { PremiumCard } from './premium-card'

type CoverLetterModuleProps = {
  data: PremiumModules['cover_letter']
}

export function CoverLetterModule({ data }: CoverLetterModuleProps) {
  const { analysis, outline, tailored_prompt } = data

  return (
    <PremiumCard
      title="Cover Letter"
      description="Assessment plus a ready-to-use outline for a targeted cover letter."
    >
      <div className="space-y-4">
        <ListBlock title="Fit analysis" items={analysis} />

        <div className="grid gap-3 md:grid-cols-3">
          <ListBlock title="Hook" items={[outline.hook]} />
          <ListBlock title="Body" items={[outline.body]} />
          <ListBlock title="Close" items={[outline.close]} />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">
            One-shot prompt
          </p>
          <p className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
            {tailored_prompt}
          </p>
        </div>
      </div>
    </PremiumCard>
  )
}
