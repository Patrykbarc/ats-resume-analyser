import { ResumeAnalyzer } from '@/components/views/resume-analyzer/resume-analyzer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <>
      <header className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          ATS Resume Analyzer
        </h1>
        <p className="text-lg text-muted-foreground">
          Get AI-powered insights to improve your resume
        </p>
      </header>

      <ResumeAnalyzer />
    </>
  )
}
