import { Card } from '@/components/ui/card'
import { useAnalyseResumeMutation } from '@/hooks/useAnalyseResumeMutation'
import { useRateLimit } from '@/hooks/useRateLimit'
import {
  getHeadersRateLimitRemaining,
  getHeadersRateLimitReset,
  isRateLimitError
} from '@/lib/rateLimits'
import { useSessionStore } from '@/stores/session/useSessionStore'
import { FileSchemaInput } from '@monorepo/schemas'
import { useNavigate } from '@tanstack/react-router'
import { AxiosResponse, isAxiosError } from 'axios'
import { type ChangeEvent, useCallback, useState } from 'react'
import { RequestLimitError } from '../request-limit-error'
import { AnalyzeFile } from './components/analyze-file'
import { UploadFile } from './components/upload-file'

export function ResumeAnalyzer() {
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  const { setRequestsLeft, setRequestsCooldown, isCooldownActive } =
    useRateLimit()

  const { mutate, isPending, error } = useAnalyseResumeMutation({
    onSuccess: (response) => {
      updateRequestLimit(response)

      setValidationError(null)
      navigate({ to: `/analyse/${response.data.id}` })
    },
    onError: (err) => {
      if (isAxiosError(err) && isRateLimitError(err)) {
        const timestamp = getHeadersRateLimitReset(err.response)

        setRequestsCooldown(timestamp)
      }
    }
  })

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (selectedFile) {
      setFile(selectedFile)
      setValidationError(null)
    }
  }, [])

  const handleAnalyse = useCallback(() => {
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
  }, [file, mutate])

  const handleReset = useCallback(() => {
    setFile(null)
    setValidationError(null)
  }, [])

  const updateRequestLimit = useCallback(
    (response: AxiosResponse) => {
      const remaining = getHeadersRateLimitRemaining(response)
      const timestamp = getHeadersRateLimitReset(response)

      if (remaining !== null) {
        setRequestsLeft(remaining)
      }

      if (timestamp) {
        setRequestsCooldown?.(timestamp)
      }
    },
    [setRequestsCooldown, setRequestsLeft]
  )

  const shouldShowError = isRateLimitError(error) || isCooldownActive

  if (shouldShowError) {
    return <RequestLimitError />
  }

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
          <RequestsLeft />
        </div>

        {validationError && (
          <p className="text-center text-rose-400">{validationError}</p>
        )}
      </Card>
    </div>
  )
}

function RequestsLeft() {
  const { requestsLeft } = useRateLimit()
  const { isPremium, isLoading } = useSessionStore()

  if (isPremium || isLoading) {
    return null
  }

  if (requestsLeft !== 0) {
    return (
      <p className="text-center">
        Requests left: <span className="font-medium">{requestsLeft ?? 5}</span>
      </p>
    )
  }

  return null
}
