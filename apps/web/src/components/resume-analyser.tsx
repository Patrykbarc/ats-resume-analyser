import { AnalysisResults } from '@/components/analysis-results'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { analyseResume } from '@/services/analyseService'
import { FileSchemaInput } from '@monorepo/schemas'
import type { AiAnalysis } from '@monorepo/types'
import { FileText, Sparkles, Upload } from 'lucide-react'
import { type ChangeEvent, useId, useState } from 'react'

export function ResumeAnalyser() {
  const [file, setFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<AiAnalysis | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (selectedFile) {
      setFile(selectedFile)
      setAnalysis(null)
      setErrorMessage(undefined)
    }
  }

  const handleAnalyse = async () => {
    if (!file) {
      return
    }

    const { success, error } = FileSchemaInput.safeParse(file)

    if (!success) {
      setErrorMessage(error.issues[0].message)
      return
    }

    setAnalyzing(true)
    setErrorMessage(undefined)

    const result = await analyseResume(file)

    if (result.success) {
      setAnalysis(result.data)
    } else {
      setErrorMessage(result.error)
    }

    setAnalyzing(false)
  }

  const handleReset = () => {
    setFile(null)
    setAnalysis(null)
  }

  return (
    <div className="space-y-8">
      {!analysis ? (
        <Card className="border-border bg-card p-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            {!file ? (
              <UploadFile handleFileChange={handleFileChange} />
            ) : (
              <AnalyseFile
                file={file}
                analyzing={analyzing}
                handlers={{ handleReset, handleAnalyse }}
              />
            )}
          </div>
          {errorMessage && (
            <p className="text-center text-rose-400">{errorMessage}</p>
          )}
        </Card>
      ) : (
        <AnalysisResults analysis={analysis} onReset={handleReset} />
      )}
    </div>
  )
}

type UploadFileProps = {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function UploadFile({ handleFileChange }: UploadFileProps) {
  const id = useId()

  return (
    <>
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
        <Upload className="h-10 w-10 text-muted-foreground" />
      </div>

      <div className="text-center">
        <h2 className="mb-2 text-xl font-semibold text-foreground">
          Upload Your Resume
        </h2>
        <p className="text-sm text-muted-foreground">PDF format</p>
        <p className="text-sm text-muted-foreground">Max size: 3MB</p>
      </div>

      <label htmlFor={id}>
        <Button variant="secondary" asChild>
          <span>Choose File</span>
        </Button>
        <input
          id={id}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="sr-only"
        />
      </label>
    </>
  )
}

type AnalyseFileProps = {
  file: File
  analyzing: boolean
  handlers: {
    handleReset: () => void
    handleAnalyse: () => void
  }
}

function AnalyseFile({
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
