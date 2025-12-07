import type { PremiumModules } from '@monorepo/types'

import { ListBlock } from './list-block'
import { PremiumCard } from './premium-card'

type InterviewPrepModuleProps = {
  data: PremiumModules['interview_prep']
}

export function InterviewPrepModule({ data }: InterviewPrepModuleProps) {
  const {
    elevator_pitch,
    likely_questions,
    stories_to_prepare,
    metrics_to_cite
  } = data

  return (
    <PremiumCard
      title="Interview Preparation"
      description="Talking points, stories, and questions to prepare ahead of interviews."
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">
            Elevator pitch
          </p>
          <p className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
            {elevator_pitch}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ListBlock title="Likely questions" items={likely_questions} />
          <ListBlock title="Stories to prepare" items={stories_to_prepare} />
        </div>

        <ListBlock title="Metrics to cite" items={metrics_to_cite} />
      </div>
    </PremiumCard>
  )
}
