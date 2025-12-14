import { Button } from '@/components/ui/button'
import { PricingCard } from '@/components/ui/pricing-card'
import { getEnvs } from '@/lib/getEnv'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/pricing/')({
  component: PricingPage
})

export type PricingPlan = typeof plan

const plan = [
  {
    name: 'Pro Analyst',
    description: 'Everything you need to land your dream job',
    price: 14.99,
    period: 'month',
    features: [
      'Unlimited resume analyses per month',
      'GPT-4 powered deep-dive analysis',
      'ATS optimization with keyword matching',
      'Content & structure recommendations',
      'Cover letter analysis & generation',
      'Interview preparation guide',
      'LinkedIn profile optimization tips',
      'Skills gap analysis',
      'Salary negotiation insights',
      'Career path recommendations'
    ],
    cta: {
      title: 'Get started',
      url: getEnvs().VITE_PAYMENT_PUBLIC_KEY
    }
  }
] as const

const brief = [
  'Unlimited Resume Analyses/Month',
  'GPT-4 Deep Analysis',
  'Career Guidance'
] as const

const faq = [
  {
    question: 'What if I exceed my analysis limit?',
    answer:
      'There is no limit on analyses for Pro users. Free users can upgrade anytime to access more analyses.'
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      "Yes, cancel your subscription anytime with no hidden fees. You'll keep access until the end of your billing period."
  },
  {
    question: 'Do you offer discounts?',
    answer:
      'Yes! Annual subscriptions get 20% off. We also offer enterprise plans for organizations.'
  },
  {
    question: 'How long do I have access to reports?',
    answer:
      'All your analysis reports are stored indefinitely. You can download and reference them anytime.'
  }
] as const

export default function PricingPage() {
  return (
    <div>
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          One Powerful Plan
        </h1>
        <p className="mb-4 text-xl text-muted-foreground">
          Professional resume analysis powered by GPT-4
        </p>
        <div className="inline-flex flex-wrap justify-center gap-4">
          {brief.map((item) => {
            return (
              <span
                key={item}
                className="rounded-md bg-accent/40 px-4 py-2 text-sm font-medium text-muted-foreground"
              >
                {item}
              </span>
            )
          })}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-md">
          {plan.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-8 text-center text-2xl font-semibold text-foreground">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {faq.map((item) => (
            <div
              key={item.question}
              className="rounded-lg border border-border bg-card p-6"
            >
              <h3 className="mb-2 font-semibold text-foreground">
                {item.question}
              </h3>
              <p className="text-sm text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-lg border border-border bg-card p-8 text-center">
        <h2 className="mb-3 text-2xl font-semibold text-foreground">
          Need higher limits or custom features?
        </h2>
        <p className="mb-6 text-muted-foreground">
          Contact our team for enterprise solutions, volume discounts, or custom
          analysis requirements.
        </p>
        <Button variant="outline">Contact Sales</Button>
      </div>
    </div>
  )
}
