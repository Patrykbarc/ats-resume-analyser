import { useAnalyseResumeMutation } from '@/hooks/useAnalyseResumeMutation'
import { useRateLimit } from '@/hooks/useRateLimit'
import {
  getHeadersRateLimitRemaining,
  getHeadersRateLimitReset,
  isRateLimitError
} from '@/lib/rateLimits'
import { FileSchemaInput } from '@monorepo/schemas'
import { useNavigate } from '@tanstack/react-router'
import { AxiosResponse, isAxiosError } from 'axios'
import { ChangeEvent, useCallback, useState } from 'react'

export const useAnalyzer = () => {
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

      if (remaining === 0 && timestamp) {
        setRequestsCooldown?.(timestamp)
      }
    },
    [setRequestsCooldown, setRequestsLeft]
  )

  const shouldShowError = isRateLimitError(error) || isCooldownActive

  return {
    shouldShowError,
    file,
    handleAnalyse,
    handleFileChange,
    handleReset,
    validationError,
    isPending
  }
}
