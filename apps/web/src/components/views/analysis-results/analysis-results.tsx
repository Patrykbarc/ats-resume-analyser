import { Button } from '@/components/ui/button'
import type { AiAnalysis } from '@monorepo/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import { ShareButton } from '../share-button'
import { AnalysisSections } from './components/analysis-sections'
import { AnalysisSummary } from './components/analysis-summary'

const TABS = {
  analyse: {
    trigger: 'Analysis',
    value: 'analyse'
  },
  preview: {
    trigger: 'Parse preview',
    value: 'preview'
  }
}

type AnalysisResultsProps = {
  analysis: AiAnalysis
  onReset?: () => void
}

export function AnalysisResults({ analysis, onReset }: AnalysisResultsProps) {
  return (
    <Tabs className="space-y-6" defaultValue={TABS.analyse.value}>
      <TabsList>
        <TabsTrigger value={TABS.analyse.value}>
          {TABS.analyse.trigger}
        </TabsTrigger>
        <TabsTrigger value={TABS.preview.value}>
          {TABS.preview.trigger}
        </TabsTrigger>
      </TabsList>

      <TabsContent className="space-y-6" value={TABS.analyse.value}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            Analysis Results
          </h2>
          {onReset && (
            <Button onClick={onReset} variant="outline">
              Analyze Another
            </Button>
          )}
        </div>

        <div className="space-y-6">
          <AnalysisSections sections={analysis.sections} />
        </div>

        <AnalysisSummary
          score={analysis.overall_score.score}
          justification={analysis.overall_score.justification}
        />
      </TabsContent>

      <TabsContent className="space-y-6" value={TABS.preview.value}>
        <p className="whitespace-pre-line">{analysis.parsed_file}</p>
      </TabsContent>

      <ShareButton id={analysis.id} />
    </Tabs>
  )
}
