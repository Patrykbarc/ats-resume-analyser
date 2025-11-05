'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { AiAnalysis } from '@monorepo/types'
import { capitalize } from 'lodash'
import { AlertCircle, CheckCircle2, Lightbulb } from 'lucide-react'
import { Progress } from './ui/progress'

type AnalysisResultsProps = {
  analysis: AiAnalysis
  onReset?: () => void
}

export function AnalysisResults({ analysis, onReset }: AnalysisResultsProps) {
  const sections = Object.entries(analysis.sections)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Analysis Results</h2>
        {onReset && (
          <Button onClick={onReset} variant="outline">
            Analyze Another
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {sections.map(([key, value], index) => {
          const title = capitalize(key.replaceAll('_', ' '))
          const description = value.map((i) => i.replaceAll('.', '. '))

          const iconsData = [
            { icon: CheckCircle2, color: 'text-green-500' },
            { icon: AlertCircle, color: 'text-yellow-500' },
            { icon: Lightbulb, color: 'text-blue-500' }
          ]

          const sectionIconData = iconsData[index % iconsData.length]

          const IconComponent = sectionIconData.icon
          const iconColor = sectionIconData.color

          return (
            <Card key={key} className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div>
                  <IconComponent className={`h-6 w-6 ${iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {title}
                </h3>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                {description}
              </p>
            </Card>
          )
        })}
      </div>

      <AnalysisSummary
        score={analysis.overall_score.score}
        justification={analysis.overall_score.justification}
      />
    </div>
  )
}

type OverallScore = AiAnalysis['overall_score']

type AnalysisSummaryProps = {
  score: OverallScore['score']
  justification: OverallScore['justification']
}

function AnalysisSummary({ score, justification }: AnalysisSummaryProps) {
  return (
    <Card className="border-border bg-card p-6">
      <h3 className="mb-3 text-lg font-semibold text-foreground">
        Overall Score
      </h3>
      <div className="grid text-end gap-3">
        <Progress value={+score} />
        <span className="text-xl font-bold">{score} / 100</span>
      </div>
      <p className="mt-3  text-muted-foreground">{justification}</p>
    </Card>
  )
}
