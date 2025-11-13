import { Card } from '@/components/ui/card'
import { AnalysisResults } from '@/components/views/analysis-results/analysis-results'
import { useAnalyseResumeMutation } from '@/hooks/useAnalyseResumeMutation'
import { FileSchemaInput } from '@monorepo/schemas'
import { isAxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { type ChangeEvent, useState } from 'react'
import { RequestLimitError } from '../request-limit-error'
import { AnalyseFile } from './components/analyse-file'
import { UploadFile } from './components/upload-file'

export function ResumeAnalyser() {
  const [file, setFile] = useState<File | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)

  const { mutate, isPending, data, error } = useAnalyseResumeMutation({
    onSuccess: () => {
      setValidationError(null)
    }
  })

  const analysis = data?.data ?? null

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (selectedFile) {
      setFile(selectedFile)
      setValidationError(null)
    }
  }

  const handleAnalyse = () => {
    if (!file) {
      return
    }

    const { success, error: validationError } = FileSchemaInput.safeParse(file)

    if (!success) {
      setValidationError(validationError.issues[0].message)
      return
    }

    setValidationError(null)
    mutate(file)
  }

  const handleReset = () => {
    setFile(null)
    setValidationError(null)
  }

  let currentErrorMessage: string | undefined

  if (validationError) {
    currentErrorMessage = validationError
  } else if (error) {
    if (isAxiosError(error) && error.response) {
      const responseStatus = error.response.status
      const responseHeaders = error.response.headers

      if (responseStatus === StatusCodes.TOO_MANY_REQUESTS) {
        const resetTimestampInSeconds = +responseHeaders?.['x-ratelimit-reset']

        if (resetTimestampInSeconds) {
          const resetTimeInMilliseconds = resetTimestampInSeconds * 1000
          const resetDate = new Date(resetTimeInMilliseconds)
          const resetTimeOnly = resetDate.toLocaleTimeString('pl-PL')

          return (
            <RequestLimitError
              message={`Limit zostanie odnowiony o ${resetTimeOnly} następnego dnia`}
            />
          )
        }
      }

      currentErrorMessage = error.message
    } else {
      currentErrorMessage = error.message
    }

    if (currentErrorMessage) {
      return <p className="text-rose-500 text-center">{currentErrorMessage}</p>
    }
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
