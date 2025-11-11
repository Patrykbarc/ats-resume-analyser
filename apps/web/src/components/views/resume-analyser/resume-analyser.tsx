import { Card } from '@/components/ui/card'
import { AnalysisResults } from '@/components/views/analysis-results/analysis-results'
import { useAnalyseResumeMutation } from '@/hooks/useAnalyseResumeMutation'
import { FileSchemaInput } from '@monorepo/schemas'
import type { AiAnalysis } from '@monorepo/types'
import { StatusCodes } from 'http-status-codes'
import { type ChangeEvent, useState } from 'react'
import { RequestLimitError } from '../request-limit-error'
import { AnalyseFile } from './components/analyse-file'
import { UploadFile } from './components/upload-file'

export function ResumeAnalyser() {
  const [file, setFile] = useState<File | null>(null)
  const [localValidationError, setLocalValidationError] = useState<
    string | null
  >(null)
  const [analysis, setAnalysis] = useState<AiAnalysis | null>(null)

  const {
    mutate,
    isPending,
    error: mutationError,
    error
  } = useAnalyseResumeMutation({
    onSuccess: (data) => {
      setAnalysis(data.data)
      setLocalValidationError(null)
    },
    onError: (error) => {
      console.error('CV analysis error from API:', error.message)
    }
  })

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (selectedFile) {
      setFile(selectedFile)
      setAnalysis(null)
      setLocalValidationError(null)
    }
  }

  const handleAnalyse = () => {
    if (!file) {
      return
    }

    const { success, error } = FileSchemaInput.safeParse(file)

    if (!success) {
      setLocalValidationError(error.issues[0].message)
      return
    }

    setLocalValidationError(null)

    mutate(file)
  }

  const handleReset = () => {
    setFile(null)
    setAnalysis(null)
    setLocalValidationError(null)
  }

  const currentErrorMessage = localValidationError
    ? localValidationError
    : mutationError instanceof Error
      ? mutationError.message
      : undefined

  if (error) {
    if (error.status === StatusCodes.TOO_MANY_REQUESTS) {
      const resetTimestampInSeconds =
        +error.response?.headers['x-ratelimit-reset']

      const resetTimeInMilliseconds = resetTimestampInSeconds * 1000

      const resetDate = new Date(resetTimeInMilliseconds)
      const resetTimeOnly = resetDate.toLocaleTimeString('pl-PL')

      return (
        <RequestLimitError
          message={`The limit will be renewed at ${resetTimeOnly} next day`}
        />
      )
    }
    return <RequestLimitError description={error.message} />
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
                analyzing={isPending}
                handlers={{ handleReset, handleAnalyse }}
              />
            )}
          </div>
          {currentErrorMessage && (
            <p className="text-center text-rose-400">{currentErrorMessage}</p>
          )}
        </Card>
      ) : (
        <AnalysisResults analysis={analysis} onReset={handleReset} />
      )}
    </div>
  )
}
