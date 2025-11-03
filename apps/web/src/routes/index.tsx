import { ResumeAnalyser } from '@/components/resume-analyser'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            ATS Resume Analyzer
          </h1>
          <p className="text-lg text-muted-foreground">
            Get AI-powered insights to improve your resume
          </p>
        </header>

        <ResumeAnalyser />
      </div>
    </main>
  )
}
