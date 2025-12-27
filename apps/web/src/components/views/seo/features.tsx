import { ComponentType, SVGProps } from 'react'
import { featureData } from './constants/feature-data'

export function Features() {
  return (
    <section className="mx-auto">
      <article className="rounded-lg border border-border bg-card p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-semibold text-card-foreground">
          What is AI Resume Analyzer?
        </h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p className="text-pretty">
            AI Resume Analyzer is an advanced career tool that uses artificial
            intelligence to evaluate your resume and provide actionable
            feedback. Whether you&apos;re a recent graduate or an experienced
            professional, our platform helps you optimize your resume for
            Applicant Tracking Systems (ATS) and human recruiters.
          </p>
          <p className="text-pretty">
            Simply upload your resume in PDF format, and our AI will analyze it
            within seconds. You&apos;ll receive detailed insights on your
            resume&apos;s strengths, areas for improvement, keyword
            optimization, formatting suggestions, and an overall score to track
            your progress.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featureData.map((feature) => (
            <FeatureItem
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </article>
    </section>
  )
}

type FeatureItemProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  description: string
}

function FeatureItem({ icon: Icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="size-5 text-primary" aria-hidden="true" />
      </div>
      <h3 className="font-semibold text-card-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}
