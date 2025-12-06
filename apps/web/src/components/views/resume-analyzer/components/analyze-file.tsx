import { Button } from '@/components/ui/button'
import { FileText, Sparkles } from 'lucide-react'

type AnalyseFileProps = {
  file: File
  analyzing: boolean
  handlers: {
    handleReset: () => void
    handleAnalyse: () => void
  }
}

export function AnalyzeFile({
  file,
  analyzing,
  handlers: { handleReset, handleAnalyse }
}: AnalyseFileProps) {
  return (
    <>
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
        <FileText className="h-10 w-10 text-accent" />
      </div>

      <div className="text-center">
        <h2 className="mb-2 text-xl font-semibold text-foreground">
          {file.name}
        </h2>
        <p className="text-sm text-muted-foreground">
          {(file.size / 1024).toFixed(2)} KB
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleAnalyse}
          disabled={analyzing}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {analyzing ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              <p>Analyzing...</p>
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              <p>Analyze Resume</p>
            </>
          )}
        </Button>

        <Button onClick={handleReset} variant="outline" disabled={analyzing}>
          Cancel
        </Button>
      </div>
    </>
  )
}
