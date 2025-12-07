import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import { ChangeEvent, useId } from 'react'

type UploadFileProps = {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function UploadFile({ handleFileChange }: UploadFileProps) {
  const id = useId()

  return (
    <>
      <div className="flex size-24 items-center justify-center rounded-full bg-secondary">
        <Upload className="size-10 text-muted-foreground" />
      </div>

      <div className="text-center">
        <h2 className="mb-2 text-xl font-semibold text-foreground">
          Upload Your Resume
        </h2>
        <p className="text-sm text-muted-foreground">PDF format</p>
        <p className="text-sm text-muted-foreground">Max size: 3MB</p>
      </div>

      <label htmlFor={id}>
        <Button asChild>
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
