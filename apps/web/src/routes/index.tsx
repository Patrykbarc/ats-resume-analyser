import { ResumeAnalyzer } from '@/components/views/resume-analyzer/resume-analyzer'
import { Faq } from '@/components/views/seo/faq'
import { Features } from '@/components/views/seo/features'
import { buildPageTitle } from '@/lib/buildPageTitle'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: buildPageTitle()
      }
    ]
  })
})

function RouteComponent() {
  return (
    <div className="space-y-12 md:space-y-24">
      <header className="mb-12 text-center">
        <h1 className="mb-4 mt-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance">
          AI-Powered Resume Analyzer
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl text-pretty leading-relaxed">
          Get instant AI-powered insights to improve your resume and land more
          interviews
        </p>
      </header>

      <section>
        <ResumeAnalyzer />
      </section>

      <Features />
      <Faq />
    </div>
  )
}
