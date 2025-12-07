import { Card } from '@/components/ui/card'
import { useAnalyseResumeMutation } from '@/hooks/useAnalyseResumeMutation'
import { useSessionState } from '@/stores/session/useSessionState'
import { FileSchemaInput } from '@monorepo/schemas'
import { useNavigate } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { type ChangeEvent, useState } from 'react'
import { RequestLimitError } from '../request-limit-error'
import { AnalyzeFile } from './components/analyze-file'
import { UploadFile } from './components/upload-file'

export function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  const { isPremium } = useSessionState()
  const navigate = useNavigate()

  const { mutate, isPending, data, error } = useAnalyseResumeMutation({
    onSuccess: (data) => {
      setValidationError(null)
      navigate({ to: `/analyse/${data?.data.id}` })
    }
  })

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
    mutate({ file, isPremium })
  }

  const handleReset = () => {
    setFile(null)
    setValidationError(null)
  }

  let currentErrorMessage: string | undefined

  if (validationError) {
    currentErrorMessage = validationError
  } else if (error) {
    if (
      isAxiosError(error) &&
      error.response?.status === StatusCodes.TOO_MANY_REQUESTS
    ) {
      const resetTimestampInSeconds = +(
        error.response.headers?.['x-ratelimit-reset'] ?? 0
      )

      if (resetTimestampInSeconds) {
        const resetDate = new Date(resetTimestampInSeconds * 1000)
        const resetTime = resetDate.toLocaleString('pl-PL')

        return <RequestLimitError resetTime={resetTime} />
      }
    }

    currentErrorMessage = error.message
  }

  if (currentErrorMessage) {
    return <p className="text-rose-500 text-center">{currentErrorMessage}</p>
  }

  return (
    !data && (
      <div className="space-y-8">
        <Card className="border-border bg-card p-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            
            {!file ? (
              <UploadFile handleFileChange={handleFileChange} />
            ) : (
              <AnalyzeFile
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
      </div>
    )
  )
}
