import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { AiAnalysis } from '@monorepo/types'

type OverallScore = AiAnalysis['overall_score']

type AnalysisSummaryProps = {
  score: OverallScore['score']
  justification: OverallScore['justification']
}

export function AnalysisSummary({
  score,
  justification
}: AnalysisSummaryProps) {
  return (
    <Card>
      <CardContent>
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          Overall Score
        </h3>
        <div className="grid text-end gap-3">
          <Progress value={+score} />
          <span className="text-xl font-bold">{score} / 100</span>
        </div>
        <p className="mt-3  text-muted-foreground">{justification}</p>
      </CardContent>
    </Card>
  )
}
