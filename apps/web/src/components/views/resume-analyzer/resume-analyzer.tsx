import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAnalyseResumeMutation } from '@/hooks/useAnalyseResumeMutation'
import { useRateLimit } from '@/hooks/useRateLimit'
import {
  getRateLimitRemaining,
  getRateLimitReset,
  isRateLimitError
} from '@/lib/localStorage'
import { cn } from '@/lib/utils'
import { FileSchemaInput } from '@monorepo/schemas'
import { Link, useNavigate } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { type ChangeEvent, useState } from 'react'
import { RequestLimitError } from '../request-limit-error'
import { AnalyzeFile } from './components/analyze-file'
import { UploadFile } from './components/upload-file'

export function ResumeAnalyzer() {
  const { requestsLeft, setRequestsLeft } = useRateLimit()
  const [file, setFile] = useState<File | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  const navigate = useNavigate()

  const { mutate, isPending, error } = useAnalyseResumeMutation({
    onSuccess: (response) => {
      const remaining = getRateLimitRemaining(response)
      if (remaining !== null) {
        setRequestsLeft(remaining)
      }

      setValidationError(null)
      navigate({ to: `/analyse/${response.data.id}` })
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const remaining = getRateLimitRemaining(error.response)
        if (remaining !== null) {
          setRequestsLeft(remaining)
        }
      }
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
    mutate(file)
  }

  const handleReset = () => {
    setFile(null)
    setValidationError(null)
  }

  if (isRateLimitError(error) || requestsLeft === 0) {
    const resetTime = isRateLimitError(error)
      ? getRateLimitReset(error.response)
      : null

    if (resetTime) {
      return <RequestLimitError resetTime={resetTime} />
    }
  }

  const currentErrorMessage = validationError || error?.message

  return (
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
          {requestsLeft !== null &&
            (requestsLeft !== 0 ? (
              <p className="text-center">
                Requests left:{' '}
                <span className="font-medium">{requestsLeft}</span>
              </p>
            ) : (
              <span className="text-center">
                No requests left.
                <br />
                <Link
                  className={cn(
                    buttonVariants({ variant: 'link' }),
                    'p-0 text-base'
                  )}
                  to="/pricing"
                >
                  Upgrade to premium
                </Link>{' '}
                for unlimited access.{' '}
              </span>
            ))}
        </div>
        {currentErrorMessage && (
          <p className="text-center text-rose-400">{currentErrorMessage}</p>
        )}
      </Card>
    </div>
  )
}
