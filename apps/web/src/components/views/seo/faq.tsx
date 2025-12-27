import { faqData } from './constants/faq-data'

export function Faq() {
  return (
    <section>
      <div className="mx-auto">
        <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
          Frequently Asked Questions
        </h2>
        <dl className="space-y-6">
          {faqData.map((item) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </dl>
      </div>
    </section>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <dt className="mb-2 text-lg font-semibold text-card-foreground">
        {question}
      </dt>
      <dd className="text-muted-foreground leading-relaxed">{answer}</dd>
    </div>
  )
}
