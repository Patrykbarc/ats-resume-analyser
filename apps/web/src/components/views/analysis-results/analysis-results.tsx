import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { AiAnalysis } from '@monorepo/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import { ShareButton } from '../share-button'
import { AnalysisSections } from './components/analysis-sections'
import { AnalysisSummary } from './components/analysis-summary'
import { PremiumModules } from './components/premium/premium-modules'

const TABS = {
  analyse: {
    trigger: 'Analysis',
    value: 'analyse'
  },
  premium: {
    trigger: 'Premium',
    value: 'premium'
  },
  preview: {
    trigger: 'Parsed file preview',
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
        <TabsTrigger value={TABS.premium.value}>
          {TABS.premium.trigger}
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

      <TabsContent className="space-y-6" value={TABS.premium.value}>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Premium Modules
          </h2>
          <p className="text-muted-foreground max-w-3xl text-pretty">
            ATS keyword coverage, cover letter support, interview prep, LinkedIn
            tuning, skills gap planning, salary strategies, career paths, and a
            ready-to-export PDF outline.
          </p>
        </div>

        <PremiumModules premium={analysis.premium_modules} />
      </TabsContent>

      <TabsContent className="space-y-6" value={TABS.preview.value}>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Preview</h2>
          <p className="text-muted-foreground max-w-3xl text-pretty">
            This is the raw, unformatted text extracted from your document. ATS
            systems analyze this exact content, meaning any errors in parsing
            (like missing formatting or broken line breaks) can severely impact
            their ability to read key information.
          </p>
        </div>

        <Card>
          <CardContent>
            <p className="whitespace-pre-line">{analysis.parsed_file}</p>
          </CardContent>
        </Card>
      </TabsContent>

      <ShareButton id={analysis.id} />
    </Tabs>
  )
}
